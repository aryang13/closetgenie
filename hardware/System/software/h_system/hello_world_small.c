#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include "system.h"
#include "altera_up_avalon_uart.h"

#define GPS_UART_BASE UART_1_BASE
#define ESP_UART_BASE UART_2_BASE

int main()
{
    // Initialize GPS UART
    alt_up_uart_dev* gps_uart = alt_up_uart_open_dev("/dev/uart_1");
    alt_up_uart_set_baud_rate(gps_uart, 9600);
    alt_up_uart_enable_read_interrupt(gps_uart);

    // Initialize ESP8266 UART
    alt_up_uart_dev* esp_uart = alt_up_uart_open_dev("/dev/uart_2");
    alt_up_uart_set_baud_rate(esp_uart, 115200);

    // Initialize WiFi connection
    alt_up_uart_putstring(esp_uart, "AT+CWMODE=1\r\n");
    usleep(1000000);
    //alt_up_uart_putstring(esp_uart, "AT+CWJAP=\"TELUS1902\",\"kZK5EXhQJFtr\"\r\n"); // Home wifi
    alt_up_uart_putstring(esp_uart, "AT+CWJAP=\"CPEN391\",\"57055954\"\r\n"); // Demo wifi
    usleep(5000000);

    // Initialize GPS data buffer
    char gps_data[256];
    int gps_data_len = 0;

    while(1)
    {
        // Check if GPS data is available
        if(alt_up_uart_get_used_space_in_read_FIFO(gps_uart) > 0)
        {
            // Read GPS data
            char gps_char = alt_up_uart_read_data(gps_uart);
            gps_data[gps_data_len++] = gps_char;

            // Check if GPS data is complete
            if(gps_char == '\n')
            {
                // Parse data for longitude and latitude
                char* latitude_start = strstr(gps_data, "$GPGGA,");
                char* latitude_end = strchr(latitude_start, ',');
                char* longitude_start = strchr(latitude_end + 1, ',');
                char* longitude_end = strchr(longitude_start + 1, ',');
                char* latitude_ns = strchr(latitude_end + 1, ',');
                char* longitude_ew = strchr(longitude_end + 1, ',');

                if(latitude_start != NULL && latitude_end != NULL && longitude_start != NULL && longitude_end != NULL && latitude_ns != NULL && longitude_ew != NULL)
                {
                    // Get longitude and latitude
                    char latitude[16];
                    char longitude[16];
                    strncpy(latitude, latitude_start + 7, latitude_end - latitude_start - 7);
                    latitude[latitude_end - latitude_start - 7] = '\0';
                    strncpy(longitude, longitude_start + 1, longitude_end - longitude_start - 1);
                    longitude[longitude_end - longitude_start - 1] = '\0';

                    // Send POST request over WiFi with longitude and latitude data
                    alt_up_uart_putstring(esp_uart, "AT+CIPSTART=\"TCP\",\"<server address>\",80\r\n");
                    usleep(5000000);
                    alt_up_uart_putstring(esp_uart, "AT+CIPSEND=31\r\n");
                    usleep(2000000);
                    alt_up_uart_putstring(esp_uart, "POST /location HTTP/1.1\r\n");
                    alt_up_uart_putstring(esp_uart, "Host: <your_server_ip_address>\r\n");
                    alt_up_uart_putstring(esp_uart, "Content-Type: application/x-www-form-urlencoded\r\n");
                    alt_up_uart_putstring(esp_uart, "Content-Length: 31\r\n");
                    alt_up_uart_putstring(esp_uart, "\r\n");
                    alt_up_uart_putstring(esp_uart, "latitude=");
                    alt_up_uart_putstring(esp_uart, latitude);
                alt_up_uart_putstring(esp_uart, "&longitude=");
                alt_up_uart_putstring(esp_uart, longitude);
                alt_up_uart_putstring(esp_uart, "\r\n");
                usleep(60000000); // wait a minute before restarting
                alt_up_uart_putstring(esp_uart, "AT+CIPCLOSE\r\n");
                gps_data_len = 0;
            }
            else
            {
                // GPS data is incomplete or invalid, discard buffer
                gps_data_len = 0;
            }
        }
    }
}
}
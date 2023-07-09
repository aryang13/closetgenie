module hardware(input logic CLOCK_50, input logic [3:0] KEY,
             input logic [9:0] SW, output logic [9:0] LEDR, 
             output logic [6:0] HEX0, output logic [6:0] HEX1, output logic [6:0] HEX2,
             output logic [6:0] HEX3, output logic [6:0] HEX4, output logic [6:0] HEX5);

logic w_rx, w_tx, g_rx, g_tx;

system u0 (
		.clk_clk       (CLOCK_50),       //       clk.clk
		.reset_reset_n (KEY[0]), //     reset.reset_n
		.wifi_uart_rxd (w_rx), // wifi_uart.rxd
		.wifi_uart_txd (w_tx), //          .txd
		.gps_uart_rxd  (g_rx),  //  gps_uart.rxd
		.gps_uart_txd  (g_tx)   //         .txd
	);


endmodule
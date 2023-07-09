-- Set Wi-Fi mode to station
wifi.setmode(wifi.STATION, true)

-- Configure Wi-Fi network credentials
wifi.sta.config{
    -- HOME NETWORK
    --ssid = "TELUS1902",
    --pwd = "kZK5EXhQJFtr",
    -- HOTSPOT
    ssid = "Hasan's iPhone",
    pwd = "Hasan_2002",
    save = false
}

-- Connect to Wi-Fi network
wifi.sta.connect()

-- Wait for connection to complete
while wifi.sta.status() ~= wifi.STA_GOTIP do
  print("Trying to connect")
  tmr.delay(1000)
end

print("Connected to WiFi!")

-- Define HTTP POST request payload
local payload = "Pls work"

-- Define HTTP request headers
local headers = "Content-Type: text/plain\r\n" ..
                "Content-Length: " .. tostring(#payload) .. "\r\n" ..
                "Connection: close\r\n" ..
                "User-Agent: ESP8266\r\n"

-- Send HTTP POST request to server
conn=net.createConnection(net.TCP, 0)
conn:on("receive", function(conn, payload) print(payload) end)
conn:connect(80,"206.12.161.3")
--https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyDyO_zC0QwkRQuWwGTpmkz754myUmsDql8
conn:send("POST /\r\n" .. headers .. "\r\n" .. payload)

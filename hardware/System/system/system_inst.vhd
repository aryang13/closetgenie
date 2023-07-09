	component system is
		port (
			clk_clk       : in  std_logic := 'X'; -- clk
			reset_reset_n : in  std_logic := 'X'; -- reset_n
			wifi_uart_rxd : in  std_logic := 'X'; -- rxd
			wifi_uart_txd : out std_logic;        -- txd
			gps_uart_rxd  : in  std_logic := 'X'; -- rxd
			gps_uart_txd  : out std_logic         -- txd
		);
	end component system;

	u0 : component system
		port map (
			clk_clk       => CONNECTED_TO_clk_clk,       --       clk.clk
			reset_reset_n => CONNECTED_TO_reset_reset_n, --     reset.reset_n
			wifi_uart_rxd => CONNECTED_TO_wifi_uart_rxd, -- wifi_uart.rxd
			wifi_uart_txd => CONNECTED_TO_wifi_uart_txd, --          .txd
			gps_uart_rxd  => CONNECTED_TO_gps_uart_rxd,  --  gps_uart.rxd
			gps_uart_txd  => CONNECTED_TO_gps_uart_txd   --          .txd
		);


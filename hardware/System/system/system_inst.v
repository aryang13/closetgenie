	system u0 (
		.clk_clk       (<connected-to-clk_clk>),       //       clk.clk
		.reset_reset_n (<connected-to-reset_reset_n>), //     reset.reset_n
		.wifi_uart_rxd (<connected-to-wifi_uart_rxd>), // wifi_uart.rxd
		.wifi_uart_txd (<connected-to-wifi_uart_txd>), //          .txd
		.gps_uart_rxd  (<connected-to-gps_uart_rxd>),  //  gps_uart.rxd
		.gps_uart_txd  (<connected-to-gps_uart_txd>)   //          .txd
	);


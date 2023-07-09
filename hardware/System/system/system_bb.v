
module system (
	clk_clk,
	reset_reset_n,
	wifi_uart_rxd,
	wifi_uart_txd,
	gps_uart_rxd,
	gps_uart_txd);	

	input		clk_clk;
	input		reset_reset_n;
	input		wifi_uart_rxd;
	output		wifi_uart_txd;
	input		gps_uart_rxd;
	output		gps_uart_txd;
endmodule

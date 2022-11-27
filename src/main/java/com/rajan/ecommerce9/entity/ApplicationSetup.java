package com.rajan.ecommerce9.entity;

public class ApplicationSetup {
	
	public static boolean isTodayDealPresent=true;
	public static String themeColor="green";
	public static String applicationName="FillBasket";
	public static boolean allowOrderMsg=false;
	public static String messageUrl="https://2factor.in/API/V1/e4713f51-e0f9-11e9-ade6-0200cd936042/ADDON_SERVICES/SEND/TSMS/";
	
	
	@Override
	public String toString() {
		return "isTodayDealPresent()=" + isTodayDealPresent + ", getThemeColor()=" + themeColor
				+ ", getApplicationName()=" + applicationName + ", isAllowOrderMsg()=" + allowOrderMsg;
	}

	
}

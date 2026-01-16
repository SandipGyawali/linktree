export function parseUserAgent(uaString: string) {
  let device = "unknown";
  let os = "unknown";
  let browser = "unknown";

  if (/mobile/i.test(uaString)) device = "mobile";
  else device = "desktop";

  if (/windows/i.test(uaString)) os = "Windows";
  else if (/mac/i.test(uaString)) os = "MacOS";
  else if (/linux/i.test(uaString)) os = "Linux";
  else if (/android/i.test(uaString)) os = "Android";
  else if (/iphone|ipad/i.test(uaString)) os = "iOS";

  if (/chrome/i.test(uaString)) browser = "Chrome";
  else if (/firefox/i.test(uaString)) browser = "Firefox";
  else if (/safari/i.test(uaString) && !/chrome/i.test(uaString)) browser = "Safari";
  else if (/edge/i.test(uaString)) browser = "Edge";

  return { device, os, browser };
}

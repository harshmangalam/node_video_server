const get_ip = os.networkInterfaces();
const ip = {};
if ("eth0" in get_ip) {
  ip.eth0 = get_ip["eth0"][0]["address"];
  findEmail.user_ip = get_ip["eth0"][0]["address"];
}
if ("wlp3s0" in get_ip) {
  ip.wlp3s0 = get_ip["wlp3s0"][0]["address"];
  findEmail.user_ip = get_ip["wlp3s0"][0]["address"];
}

findEmail.user_system_name = os.userInfo()["username"];
findEmail.user_os = os.platform();
findEmail.isLoggedin = true;

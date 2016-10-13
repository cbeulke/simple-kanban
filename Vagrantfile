Vagrant.configure("2") do |config|
  config.proxy.http = "http://192.168.104.1:3128"
  config.proxy.https = "http://192.168.104.1:3128"
  config.proxy.no_proxy = "localhost,127.0.0.1"

  config.vm.box = "hashicorp/precise64"
  config.vm.provision :shell, path: "bootstrap.sh"
  config.vm.network :forwarded_port, guest: 3000, host: 3000
end

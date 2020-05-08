
 //// EOS ////////////
    var {
	format,
	api,
	ecc,
	json,
	Fcbuffer
    } = Eos.modules;
    
    chain = {
	mainnet: 'f9f432b1851b5c179d2091a96f593aaed50ec7466b74f89301f957a83e56ce1f',
	testnet: '038f4b0fc8ff18a4f0842a8f0564611f6e96e8535901dd45e43ac8691a1c4dca',
	sysnet: 'cf057bbfb72640471fd910bcb67639c22df9f92470936cddc1ade0e2f2e7dc4f'
    };
    
    /**
       Other httpEndpoint's: https://www.eosdocs.io/resources/apiendpoints
    */
   let eosconfig = {
	///httpEndpoint: 'http://209.97.162.124:8800',
	///chainId: chain.sysnet,
	httpEndpoint: 'http://209.97.162.124:8080',
	chainId: chain.mainnet,
	keyProvider: '5JkoaMxk7Bi89h3kEFKPu3rsq3FuMub273WgFCE43zDBfSfw4Qp',
	verbose: false,
broadcast: true,
debug: true,
sign: true
    };

let eos = Eos(eosconfig);

ScatterJS.plugins( Vexanium() );
var fromDappBrowser = navigator.userAgent=='VexWalletAndroid';
var appname = document.title;
var network = ScatterJS.Network.fromJson({
	blockchain: bc('vex'),
	chainId:'f9f432b1851b5c179d2091a96f593aaed50ec7466b74f89301f957a83e56ce1f',
	host:'209.97.162.124',
	port:8080,
	protocol:'http'
});

var account;
let balance = '';
let net = '';
let cpu = '';
let dots = 0;
$('.eye').text('|');

setTimeout(function(){	
	connect();
},1000);

$('#ufo').on('click touch', function(){
	$(this).toggleClass('flying');
	$(this).toggleClass('caught');
});
$('#login').on('click touch', function(){
	connect();
});
function zero() {
$('#balance').html("0.0000 VEX");
$('#balancetsr').html("0.0000 TSR");
	$('#dots').text('.');
	dots = 0;
}
function loading() {
	if(dots < 6) {
		$('#dots').append('.');
		dots++;
	}
}
function sleepy() {
	$('.tog').addClass('d-none');
	$('#login,#eyes').removeClass('d-none');
	$('#login').prop('disabled', false);
	$('.eye').text('X');
	$('#intro').text('Welcome');
}
function connect() {
	$('.tog').addClass('d-none');
	$('#dots,#login').removeClass('d-none');
	$('#login').prop('disabled', true);
	zero();
	try{
		if(!fromDappBrowser){
			ScatterJS.connect(appname,{network}).then(connected => {
				if(!connected) {
alert("Please login Vexwallet PC, if you won't to login vexwallet, you can submit manual");
					notConnected();
					return;
				}
				login();
			});
		} else {
			pe.getWalletWithAccount().then((res)=>{
				if(!res) {
					notConnected();
					return;
				}
				account = res.data.account;
				onConnected();
			});	
		}
	} catch (e) {
		console.log(e);
	}
}
function notConnected(){
	$('.tog').addClass('d-none');
	$('#login,#nopen').removeClass('d-none');
	setTimeout(sleepy, 500);
}

function login() {
	try{
		ScatterJS.login().then(id => {
			if(!id) return;
			account = id.accounts[0].name;
			onConnected();
		});
	} catch (e) {
		console.log(e);
	}
}
function onConnected(){
	$('.tog').addClass('d-none');
	$('#gotin,#logout').removeClass('d-none');
	$('#yourBp').text(account);
 $('#mybalance').text(balance);
 $('#balance').text(balance);
	$('#logout').on('click touch', function(){
		logout();
	});
	getinfo(account);
}
function getinfo() {
	try {
		const vexnet = VexNet(network);
		vexnet.getAccount(account).then(info => {
			net = info.self_delegated_bandwidth.net_weight?info.self_delegated_bandwidth.net_weight:net;
cpu = info.self_delegated_bandwidth.cpu_weight?info.self_delegated_bandwidth.cpu_weight:cpu;
			balance = info.core_liquid_balance?info.core_liquid_balance:balance;
			setTimeout(function(){
				$('#user').text(account);
$('#bidder').text(account);
				$('#mybalance').text(balance);
$('#balance').text(balance);
$('#stakebalance').text(balance);
$('#netstake').text(net);
$('#cpustake').text(cpu);
			}, 500);
		});
vexnet.getCurrencyBalance('tsrstableidr', account, 'TSR').then(result => {
		console.log(result);
$('#balancetsr').html(result[0]);
});
	} catch (e) {
		console.log(e);
	}
}
function logout() {
	try {
		if(!fromDappBrowser) ScatterJS.logout();
		sleepy();
$('#user').text("please login again");
$('#stakebalance').text("please login again");
$('#cpustake').text("please login again");
$('#netstake').text("please login again");
$('#yourBp').text("please login again");
				$('#mybalance').text("please login again");
$('#balance').text("please login again");
$('#balancetsr').text("please login again");
$('#bidder').text("please login again");
	} catch (e) {
		console.log(e);
	}
}


$("#premiumId").click(function() {
var nama = $("#nameId").val();
var vex = "vex";
var id = $("#domainName").val();
var domain = nama + id;
var vexnet = VexNet(network);
		vexnet.getAccount(domain).then(res => {
$("#availableId").text(domain + " has been taken");
}).catch(err => {
$("#availableId").text(domain + " available");
if (nama == vex) {
$("#availableId").text("don't use vex")};
if (domain.length > 12) {
$("#availableId").text("must be 12 charachters with " + id)};
var upperCaseLetters = /[A-Z]/g;
if (nama.match(upperCaseLetters)) {
$("#availableId").text("must be lowerCaseLetters")};
var numbers = /[0,6-9]/g;
if (nama.match(numbers)) {
$("#availableId").text("must be use number 1-5")};
if (domain.length > 6) {
$("#priceId").val("1250.0000 VEX");
M.updateTextFields()};
if (domain.length <= 6) {
$("#priceId").val("2500.0000 VEX");
M.updateTextFields()};
})
});

$("#vex").click(function() {
var price = "2500.0000 VEX";
var midprice = "1250.0000 VEX";
var nama = $("#nameId").val();
var id = $("#domainName").val();
var domain = nama + id;
if (domain.length <= 6) {
	$("#priceId").val(price);
M.updateTextFields()};
if (domain.length > 6) {
	$("#priceId").val(midprice);
M.updateTextFields()}
});

$("#tsr").click(function() {
var price = "50000.0000 TSR";
var midprice = "25000.0000 TSR";
var nama = $("#nameId").val();
var id = $("#domainName").val();
var domain = nama + id;
if (domain.length <= 6) {
	$("#priceId").val(price);
M.updateTextFields()};
if (domain.length > 6) {
	$("#priceId").val(midprice);
M.updateTextFields()}
});

$("#buy").click(function() {
window.ScatterJS.scatter.connect(appname).then(connected => {
if(!connected) return false;
window.ScatterJS.plugins( new window.ScatterEOS());
   var scatter = window.ScatterJS.scatter;
 const requiredFields = { accounts:[network] };
   scatter.getIdentity(requiredFields).then(() => {
 account = scatter.identity.accounts.find(account => account.blockchain === 'eos');
if (!account) return;
 var akun = account.name;
var sign = `${account.name}@${account.authority}`;
var contract_transfer = "vex.token";
var contract_tsr = "tsrstableidr";
var price = $("#priceId").val();
var nama = $("#nameId").val();
var id = $("#domainName").val();
var pubkey = $("#pubkeyku").val();
var domain = nama + id;
var vexnet = VexNet(network);
var konfirmasi = confirm ("Are you sure for buy account " + domain + " ?");
if(konfirmasi == true) {
if(vex.checked){
vexnet.contract(contract_transfer).then(contract =>
  contract.transfer({
from: akun,
to: "ekasepbanjar",
quantity: price,
memo: "Buy account " + domain + " with public key " + pubkey,
}, {
authorization: sign
})).then(trx => {
var tx = `${trx.transaction_id}`;
$("#txid").text(tx);
alert("Transfer Success");
connect();
eos.transaction(tr => {

    tr.newaccount({
        creator: 'id',
        name: domain,
        owner: pubkey,  // <------ the public key the of the new user account that was generate by a wallet tool or the eosjs-keygen
        active: pubkey  
    });

    tr.buyram({
        payer: 'id',
        receiver: domain,
        quant: '0.5000 VEX' // <------  less might work, but 5Kb worked for me
    });

    tr.delegatebw({
        from: 'id',
        receiver: domain,
        stake_net_quantity: '0.5000 VEX', 
        stake_cpu_quantity: '0.5000 VEX', 
        transfer: 0
    });

}).then( (resp) =>{
    console.log("VEX resp ", resp);
});
}).catch(function(exception) {
alert(exception);
})
};
if(tsr.checked){
vexnet.contract(contract_tsr).then(contract =>
  contract.transfer({
from: akun,
to: "ekasepbanjar",
quantity: price,
memo: "Buy account " + domain,
}, {
authorization: sign
})).then(trx => {
var tx = `${trx.transaction_id}`;
$("#txid").text(tx);
alert("Transfer Success");
connect();
}).catch(function(exception) {
alert(exception);
})
}
}else{
alert("canceled")
}
}) 
}) 
});


   

  
$("#generate").on("click", function() {
ecc.randomKey().then(privateKey => {
$('#privkey').text(privateKey);
var pubkey = ecc.privateToPublic(privateKey);
$('#pubkey').text(pubkey);
alert("Please backup your key, don't give private key to other people")
})
});

$("#cekPubkey").on("click", function() {
var key = $("#pubkeyku").val();
var cek = ecc.isValidPublic(key);
	 $("#validPubkey").text(cek);
});

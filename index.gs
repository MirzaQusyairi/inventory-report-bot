//CONFIG
var BOT_TOKEN = "1234567890:abcdefghijklmnopqrstuvwxyz" //BOT TOKEN ANDA
var SS_URL = "https://docs.google.com/spreadsheets/d/abcdefghijklmnopq/edit#gid=0" //URL SPREADSHEET
var SHEET_NAME = "Report" //NAMA SHEET
var USERS = [
	659602331,
	
] //CHAT ID, bisa lebih dari 1


//BEGIN
var SHEET = SpreadsheetApp.openByUrl(SS_URL).getSheetByName(SHEET_NAME);

function doGet(e) {
	return HtmlService.createHtmlOutput('<h1>OK</h1>')
}

function doPost(e) {
	if (e.postData.type == "application/json") {
		let update = JSON.parse(e.postData.contents);
		if (update) {
			commands(update)
			return true
		}
	}
}

function commands(update) {

	let chatId = update.message.chat.id;
	let first_name = update.message.chat.first_name;
	let text = update.message.text || '';
	let tanggal = new Date().toLocaleString();

	if (USERS.includes(chatId)) {

		if (text.startsWith("/start")) {
			sendMessage({
				chat_id: chatId,
				text: "Mulai laporan dengan cara \n/new [kode barang] [#status] [keterangan]"
			})
		} else if (text.startsWith("/new")) {
			let keterangan,
				kode_barang,
				status,
				insert_result = {},
				stext = text.split(' ')

      kode_barang = stext[1];
      status = stext[2].startsWith('#') ? stext[2].replace('#', '') : '';
      stext.splice(0, 3);
      keterangan = stext.join(' ')
    
			if (kode_barang && status && keterangan) {
				insert_value([
					tanggal,
					kode_barang,
          '',
					status,
					keterangan,
					chatId,
					first_name
				], SHEET)

				sendMessage({
					chat_id: chatId,
					text: 'Laporan sukses.'
				})

			} else {
				sendMessage({
					chat_id: chatId,
					text: 'Gagal. Pastikan sesuai format. \n/new [kode barang] [#status] [keterangan]'
				})
			}
		}
	} else {
    if (text.startsWith("/start")) {
			sendMessage({
				chat_id: chatId,
				text: "User belum memiliki akses, harap hubungi admin"
			})
		}
  }
}

function sendMessage(postdata) {
	var options = {
		'method': 'post',
		'contentType': 'application/json',
		'payload': JSON.stringify(postdata),
		'muteHttpExceptions': true
	};
	UrlFetchApp.fetch('https://api.telegram.org/bot' + BOT_TOKEN + '/sendMessage', options);
}
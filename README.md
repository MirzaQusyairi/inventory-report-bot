# inventory-report-bot

Laporan inventaris, pencatatan inventaris dengan Bot Telegram yang terintegrasi dengan Google Spreadsheet

<img src="https://github.com/MirzaQusyairi/inventory-report-bot/blob/main/documentation/telegram.png?raw=true" width="45%"> 
<img src="https://github.com/MirzaQusyairi/inventory-report-bot/blob/main/documentation/spreadsheet.png?raw=true" width="45%">

## Buat Bot telegram
1. Buka telegram search @BotFather
2. Create New Bot /newbot
3. Masukkan nama kemudian username.
4. Setelah berhasil maka akan mendapatkan Bot Token.

## Buat Spreadsheet
Pertama buat sheet dengan nama "Report" dan buat kolom sebagai berikut
1. ID
2. Tanggal
3. Kode
4. Nama
5. Status
6. Keterangan
7. ID Pelapor
8. Nama Pelapor

Lalu buat sheet dengan nama "Inventory" dan buat kolom sebagai berikut
1. Kode
2. Nama
3. Jumlah
4. Pada sheet "Report" ganti cell "Nama" dengan rumus "=ArrayFormula(IF(ROW(C:C)=1,"Nama",IF(ISBLANK(C:C),"",VLOOKUP(C:C,Inventory!$A$2:$C$4, 2))))"
5. Hapus seluruh baris di sheet "Report" terkecuali baris ke 1

## Buat Apps Script
1. Upload file ke Google App Script
2. Buka index.gs
3. Sesuaikan Token, Spreadsheet URL, Nama sheet, dan Pengguna bot (Chat ID*)
4. Deploy di Google App Script sebagai Web app, dan simpan urlnya

## Set webhook Bot Telegram
1. Buka di browser https://api.telegram.org/bot[token]/setwebhook?url=[url_hasil_deploy]

## *Note:
Untuk mendapatkan Chat ID, buka telegram, search @getYourID_bot atau https://t.me/getyourid_bot


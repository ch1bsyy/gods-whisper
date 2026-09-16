const fallbackVerses = [
  {
    text: "Sebab seorang anak telah lahir untuk kita, seorang putra telah diberikan untuk kita.",
    reference: "Yesaya 9:5",
  },
  {
    text: "Kemuliaan bagi Allah di tempat yang mahatinggi dan damai sejahtera di bumi di antara manusia yang berkenan kepada-Nya.",
    reference: "Lukas 2:14",
  },
  {
    text: "Sebab begitu besar kasih Allah akan dunia ini, sehingga Ia telah mengaruniakan Anak-Nya yang tunggal.",
    reference: "Yohanes 3:16",
  },
  {
    text: "Bersukacitalah senantiasa di dalam Tuhan! Sekali lagi kukatakan: Bersukacitalah!",
    reference: "Filipi 4:4",
  },
  {
    text: "Pencobaan-pencobaan yang kamu alami ialah pencobaan-pencobaan biasa, yang tidak melebihi kekuatan manusia. Sebab Allah setia dan karena itu Ia tidak akan membiarkan kamu dicobai melampaui kekuatanmu. Pada waktu kamu dicobai Ia akan memberikan kepadamu jalan ke luar, sehingga kamu dapat menanggungnya.",
    reference: "1 Korintus 10:13",
  },
  {
    text: "Jagalah hatimu dengan segala kewaspadaan, karena dari situlah terpancar kehidupan.",
    reference: "Amsal 4:23",
  },
  {
    text: "Segala perkara dapat kutanggung di dalam Dia yang memberi kekuatan kepadaku.",
    reference: "Filipi 4:13",
  },
  {
    text: "Karena masa depan sungguh ada, dan harapanmu tidak akan hilang.",
    reference: "Amsal 23:18",
  },
  {
    text: "Seorang sahabat menaruh kasih setiap waktu dan menjadi seorang saudara dalam kesukaran.",
    reference: "Amsal 17:17",
  },
  {
    text: "Tetapi carilah dahulu Kerajaan Allah dan kebenarannya, maka semuanya itu akan ditambahkan kepadamu.",
    reference: "Matius 6:33",
  },
  {
    text: "Janganlah kamu menjadi serupa dengan dunia ini, tetapi berubahlah oleh pembaharuan budimu, sehingga kamu dapat membedakan manakah kehendak Allah: apa yang baik, yang berkenan kepada Allah dan yang sempurna.",
    reference: "Roma 12:2",
  },
  {
    text: "Firman-Mu itu pelita bagi kakiku dan terang bagi jalanku.",
    reference: "Mazmur 119:105",
  },
  {
    text: "Janganlah kamu menjadi hamba uang  dan cukupkanlah dirimu dengan apa yang ada padamu. Karena Allah telah berfirman: “Aku sekali-kali tidak akan membiarkan engkau dan Aku sekali-kali tidakakan meninggalkan engkau.",
    reference: "Ibrani 13:5",
  },
  {
    text: "Ia membuat segala sesuatu indah pada waktunya, bahkan Ia memberikan kekekalan dalam hati mereka. Tetapi manusia tidak dapat menyelami pekerjaan yang dilakukan Allah dari awal sampai akhir.",
    reference: "Pengkhotbah 3:11",
  },
  {
    text: "Sebab rancangan-Ku bukanlah rancanganmu , dan jalanmu bukanlah jalan-Ku, demikianlah firman TUHAN.",
    reference: "Yesaya 55:8",
  },
  {
    text: "Sebab Aku ini mengetahui rancangan-rancangan apa yang ada pada-Ku mengenai kamu, demikianlah firman TUHAN, yaitu rancangan damai sejahtera dan bukan rancangan kecelakaan, untuk memberikan kepadamu hari depan yang penuh harapan.",
    reference: "Yeremia 29:11",
  },
  {
    text: "Jika kita mengaku dosa kita, maka Ia adalah setia dan adil, sehingga Ia akan mengampuni segala dosa kita dan menyucikan kita dari segala kejahatan.",
    reference: "1 Yohanes 1:9",
  },
  {
    text: "Jawab Yesus kepadanya: Kasihilah Tuhan, Allahmu, dengan segenap hatimu dan dengan segenap jiwamu dan dengan segenap akal budimu. Itulah hukum yang terutama dan yang pertama. Dan hukum yang kedua, yang sama dengan itu, ialah: Kasihilah sesamamu manusia seperti dirimu sendiri. Pada kedua hukum inilah tergantung seluruh hukum Taurat dan kitab para nabi.",
    reference: "Matius 22:37-40",
  },
  {
    text: "Takut akan TUHAN adalah permulaan pengetahuan, tetapi orang bodoh menghina hikmat dan didikan.",
    reference: "Amsal 1:7",
  },
  {
    text: "Dahulu aku muda, sekarang telah menjadi tua, tetapi tidak pernah kulihat orang benar ditinggalkan, atau anak cucunya meminta-minta roti;",
    reference: "Mazmur 37:25",
  },
  {
    text: "Percayalah kepada TUHAN dengan segenap hatimu, dan janganlah bersandar kepada pengertianmu sendiri. Akuilah Dia dalam segala lakumu , maka Ia akan meluruskan jalanmu.",
    reference: "Amsal 3:5-6",
  },
  {
    text: "Besi menajamkan besi, orang menajamkan sesamanya.",
    reference: "Amsal 27:17",
  },
  {
    text: "Tinggi hati mendahului kehancuran, tetapi kerendahan hati mendahului kehormatan.",
    reference: "Amsal 18:12",
  },
  {
    text: "Kecongkakan mendahului kehancuran, dan tinggi hati mendahului kejatuhan.",
    reference: "Amsal 16:18",
  },
  {
    text: "Janganlah takut, sebab Aku menyertai engkau, janganlah bimbang, sebab Aku ini Allahmu; Aku akan meneguhkan, bahkan akan menolong engkau; Aku akan memegang engkau dengan tangan kanan-Ku yang membawa kemenangan.",
    reference: "Yesaya 41:10",
  },
  {
    text: "Berjaga-jagalah! Berdirilah dengan teguh dalam iman! Bersikaplah sebagai laki-laki! Dan tetap kuat!",
    reference: "1 Korintus 16:13",
  },
  {
    text: "Iman adalah dasar dari segala sesuatu yang kita harapkan dan bukti dari segala sesuatu yang tidak kita lihat.",
    reference: "Ibrani 11:1",
  },
  {
    text: "Marilah kepada-Ku, semua yang letih lesu dan berbeban berat, Aku akan memberi kelegaan kepadamu.",
    reference: "Matius 11:28",
  },
  {
    text: "Kita tahu sekarang, bahwa Allah turut beakerja dalam segala sesuatu untuk mendatangkan kebaikan bagi mereka yang mengasihi Dia, yaitu bagi mereka yang terpanggil sesuai dengan rencana Allah.",
    reference: "Roma 8:28",
  },
  {
    text: "Bersukacitalah senantiasa. Tetaplah berdoa. Mengucap syukurlah dalam segala hal, sebab itulah yang dikehendaki Allah di dalam Kristus Yesus bagi kamu.",
    reference: "1 Tesalonika 5:16-17",
  },
  {
    text: "Hati yang gembira adalah obat yang manjur, tetapi semangat yang patah mengeringkan tulang.",
    reference: "Amsal 17:22",
  },
  {
    text: "Dan keselamatan tidak ada di dalam siapapun juga selain di dalam Dia, sebab di bawah kolong langit ini tidak ada nama lain yang diberikan kepada manusia yang olehnya kita dapat diselamatkan.",
    reference: "Kisah Para Rasul 4:12",
  },
  {
    text: "Sebab itu janganlah kamu kuatir akan hari besok, karena hari besok mempunyai kesusahannya sendiri. Kesusahan sehari cukuplah untuk sehari.",
    reference: "Matius 6:34",
  },
  {
    text: "Allahku akan memenuhi segala keperluanmu menurut kekayaan dan kemuliaan-Nya dalam Kristus Yesus.",
    reference: "Filipi 4:19",
  },
  {
    text: "Karena di mana hartamu berada, di situ juga hatimu berada.",
    reference: "Matius 6:21",
  },
  {
    text: "Jangan seorangpun menganggap engkau rendah karena engkau muda. Jadilah teladan bagi orang-orang percaya, dalam perkataanmu, dalam tingkah lakumu, dalam kasihmu, dalam kesetiaanmu dan dalam kesucianmu.",
    reference: "1 Timotius 4:12",
  },
  {
    text: "Jadi akhirnya, saudara-saudara, semua yang benar, semua yang mulia, semua yang adil, semua yang suci, semua yang manis, semua yang sedap didengar, semua yang disebut kebajikan dan patut dipuji, pikirkanlah semuanya itu.",
    reference: " Filipi 4:8",
  },
  {
    text: "Sebab Imam Besar yang kita punya, bukanlah imam besar yang tidak dapat turut merasakan kelemahan-kelemahan kita, sebaliknya sama dengan kita, Ia telah dicobai, hanya tidak berbuat dosa.",
    reference: "Ibrani 4:15",
  },
  {
    text: "Janganlah hendaknya kerajinanmu kendor, biarlah rohmu menyala-nyala dan layanilah Tuhan.",
    reference: "Roma 12:11",
  },
  {
    text: "Pencobaan-pencobaan yang kamu alami ialah pencobaan-pencobaan biasa, yang tidak melebihi kekuatan manusia. Sebab Allah setia dan karena itu Ia tidak akan membiarkan kamu dicobai melampaui kekuatanmu. Pada waktu kamu dicobai Ia akan memberikan kepadamu jalan ke luar, sehingga kamu dapat menanggungnya.",
    reference: "1 Korintus 10:13",
  },
  {
    text: "Bukankah burung pipit dijual dua ekor seduit? Namun seekorpun dari padanya tidak akan jatuh ke bumi di luar kehendak Bapamu. Dan kamu, rambut kepalamupun terhitung semuanya. Sebab itu janganlah kamu takut, karena kamu lebih berharga dari pada banyak burung pipit.",
    reference: "Matius 10:30-31",
  },
  {
    text: "Apabila kamu menjadi marah, janganlah kamu berbuat dosa: janganlah matahari terbenam, sebelum padam amarahmu.",
    reference: "Efesus 4:26",
  },
  {
    text: "Sekalipun pohon ara tidak berbunga, pohon anggur tidak berbuah, hasil pohon zaitun mengecewakan, sekalipun ladang-ladang tidak menghasilkan bahan makanan, kambing domba terhalau dari kurungan, dan tidak ada lembu sapi dalam kandang, namun aku akan bersorak-sorak di dalam TUHAN, beria-ria di dalam Allah yang menyelamatkan aku. ALLAH Tuhanku itu kekuatanku: Ia membuat kakiku seperti kaki rusa, Ia membiarkan aku berjejak di bukit-bukitku. (Untuk pemimpin biduan. Dengan permainan kecapi).",
    reference: "Habakuk 3:17-19",
  },
  {
    text: "Takut akan TUHAN adalah didikan yang mendatangkan hikmat, dan kerendahan hati mendahului kehormatan.",
    reference: "Amsal 15:33",
  },
  {
    text: "Bersukacitalah dalam pengharapan, sabarlah dalam kesesakan, dan bertekunlah dalam doa!",
    reference: "Roma 12:12",
  },
  {
    text: "Janganlah kamu sesat: Pergaulan yang buruk merusakkan kebiasaan yang baik.",
    reference: "1 Korintus 15:33",
  },
  {
    text: "Aku telah datang ke dalam dunia sebagai terang, supaya setiap orang yang percaya kepada-Ku, jangan tinggal di dalam kegelapan.",
    reference: "Yohanes 12:46",
  },
  {
    text: "Kata Yesus kepadanya: Akulah jalan dan kebenaran dan hidup. Tidak ada seorangpun yang datang kepada Bapa, kalau tidak melalui Aku.",
    reference: "Yohanes 14:6",
  },
  {
    text: "Sebab beginilah firman Tuhan ALLAH, Yang Mahakudus, Allah Israel: Dengan bertobat dan tinggal diam kamu akan diselamatkan, dalam tinggal tenang dan percaya terletak kekuatanmu. Tetapi kamu enggan,",
    reference: "Yesaya 30:15",
  },
  {
    text: "Sebab Aku menyukai kasih setia, dan bukan korban sembelihan, dan menyukai pengenalan akan Allah, lebih dari pada korban-korban bakaran.",
    reference: "Hosea 6:6",
  },
  {
    text: "Tiap-tiap orang harus takluk kepada pemerintah yang di atasnya, sebab tidak ada pemerintah, yang tidak berasal dari Allah; dan pemerintah-pemerintah yang ada, ditetapkan oleh Allah.",
    reference: "Roma 13:1",
  },
  {
    text: "TUHAN menetapkan  langkah-langkah orang yang hidupnya berkenan  kepada-Nya; apabila ia jatuh, tidaklah sampai tergeletak, sebab TUHAN menopang  tangannya.",
    reference: "Mazmur 37:23-24",
  },
  {
    text: "Walau seribu orang rebah di sisimu, dan sepuluh ribu di sebelah kananmu, tetapi itu tidak akan menimpamu.",
    reference: "Mazmur 91:7",
  },
];

export default fallbackVerses;

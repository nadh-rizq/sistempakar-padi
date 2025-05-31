<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\optPadi;
use App\Models\gejalaOptPadi;
use App\Models\alternatif;
use App\Models\kategoriGejala;
use App\Models\tabelKeputusan;
use App\Models\penanggulanganOpt;
use App\Models\roleUser;
use App\Models\User;

use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        $role = [
            [
            'kodeRole'=> 'R0LE01',
            'role'=> 'admin',
            ],
            [
            'kodeRole'=> 'R0LE02',
            'role'=> 'expert',
            ],
            [
            'kodeRole'=> 'R0LE03',
            'role'=> 'user',
            ]
        ];
        foreach ($role as $item) {
            roleUser::create([
                'kodeRole' => $item['kodeRole'],
                'role' => $item['role']
            ]);

        }

        User::create([
            'google_id' => null,
            'google_token' => null,
            'google_refresh_token' => null,
            'name' => 'Admin ExpertSystem',
            'email' => 'adminexpert@padimu.my.id',
            'email_verified_at' => now(),
            'password' => Hash::make('4dm1nexpert@optpadi'), // Gantilah dengan password yang aman
            'kodeRole' => 'R0LE01', // Pastikan role ini sudah ada di tabel role_users
        ]);

        User::create([
            'google_id' => null,
            'google_token' => null,
            'google_refresh_token' => null,
            'name' => 'Pakar ExpertSystem',
            'email' => 'expert@padimu.my.id',
            'email_verified_at' => now(),
            'password' => Hash::make('3xp3rt@optpadi'), // Gantilah dengan password yang aman
            'kodeRole' => 'R0LE02', // Pastikan role ini sudah ada di tabel role_users
        ]);

        $opt = [[
            'opt' => 'Blas',
            'latin' => 'Pyricularia oryzae',
            'deskripsi'=> 'Penyakit ini disebabkan oleh jamur pyricularia oryzae yang mengakibatkan ketahanan tanaman padi cepat menurun atau rusak.',
            'gambar'=> 'p01_1748173170.jpg'
        ],
        [
            'opt' => 'Bercak Coklat',
            'latin' => 'Helminthosporium oryzae/Drechslera oryzae',
            'deskripsi'=> 'Bercak coklat termasuk penyakit yang terbawa dari benih diakibatkan jamur Drechslera oryzae. Jamur D. Orzae menghasilkan toksin (racun) yang dapat menginfeksi persemaian, menghambat pertumbuhan akar, serta mempengaruhi respirasi daun.',
            'gambar'=> 'p02_1748173186.jpg'
        ],
        [
            'opt' => 'Bercak Coklat Sempit',
            'latin' => 'Cercospora oryzae',
            'deskripsi'=> 'Penyakit bercak coklat sempit telah dilaporkan menyebabkan kehilangan hasil hingga 40% di beberapa negara. Serangan penyakit ini umumnya terjadi pada fase anakan akhir hingga pembungaan, dan lebih parah saat kondisi lembap serta pemupukan nitrogen berlebihan.',
            'gambar'=> 'p03_1748173203.jpg'
        ],
        [
            'opt' => 'Hawar pelepah',
            'latin' => 'Rhizoctonia solani',
            'deskripsi'=> 'Umumnya penyakit ini timbul ketika tanaman memasuki fase anakan maksimum terutama pada padi di lahan pasang surut bergambut. Penyakit ini dapat mengakibatkan kerugian hingga di angka 20% jika infeksi sampai pada daun bendera.',
            'gambar'=> 'p04_1748173219.jpg'
        ],
        [
            'opt' => 'Noda Palsu',
            'latin' => 'Ustilaginoidea virens',
            'deskripsi'=> 'Penyakit ini dapat menurunkan mutu benih dan hasil panen padi. Jamur patogen penghasil ustiloxin, yaitu racun yang berbahaya bagi hewan.',
            'gambar'=> 'p05_1748173235.png'
        ],
        [
            'opt' => 'Kerdil Rumput',
            'latin' => 'Grassy Stunt',
            'deskripsi'=> 'Kerdil rumput disebabkan oleh pantogen rice grassy stunt, tanaman akan tampak seperti rumput, dengan anakan yang banyak membentuk kipas, dan berukuran kecil.',
            'gambar'=> 'p06_1748173250.jpg'
        ],
        [
            'opt' => 'Kresek/Hawar Daun',
            'latin' => 'Xanthomonas campestris pv. Oryzae',
            'deskripsi'=> 'Penyakit ini termasuk penyakit terbawa benih, sering dikenal dengan istilah bacterial leaf blight (BLB) yang dapat menginfeksi baik pada fase vegetatif maupun generatif.',
            'gambar'=> 'p07_1748173297.jpg'
        ],
        [
            'opt' => 'Tungro',
            'latin' => 'Tungro',
            'deskripsi'=> 'Penyakit tungro disebabkan oleh dua jenis virus, yaitu virus berbentuk batang (RTBV: Rice Tungro Bacilliform Virus) dan virus berbentuk bulat (RTSV: Rice Tungro Spherical-form Virus).',
            'gambar'=> 'p08_1748173315.jpeg'
        ],
        [
            'opt' => 'Wereng Batang Coklat',
            'latin' => 'Nilaparvata lugens',
            'deskripsi'=> 'Populasi wereng batang coklat dipicu oleh penggunaan insektisida dalam jumlah besar dengan tidak tepat, yang menyebabkan matinya musuh alami WBC dan memberi peluang bagi organisme ini berkembang pesat.',
            'gambar'=> 'p09_1748173355.jpg'
        ],
        [
            'opt' => 'Tikus Sawah',
            'latin' => 'Rattus argentiventer',
            'deskripsi'=> 'Kepadatan populasi tikus sawah berkaitan erat dengan perkembangan tanaman padi itu sendiri, lahan yang ditanami padi lebih dari sekali setahun cenderung mengalami dua kali lonjakan populasi tikus, yaitu pada penanaman fase vegetatif dan generatif. Perkembangbiakan tikus dipengaruhi oleh iklim dan ketersediaan pakan mereka.',
            'gambar'=> 'p10_1748173402.png'
        ]];

        foreach ($opt as $item) {
            $kodeOpt = alternatif::kode('P', 'opt_padis');

            optPadi::create([
                'kodeOpt' => $kodeOpt,
                'opt' => $item['opt'],
                'nama_latin' => $item['latin'],
                'deskripsi' => $item['deskripsi'],
                'gambar' => $item['gambar']
            ]);
        }

        $gejala = [
            'Bercak pada pelepah daun',
            'Bercak berbentuk belah ketupat pada daun dan pelepah daun',
            'Bercak berwarna abu-abu atau agak putih dan pinggirannya berwarna coklat atau coklat kemerahan',
            'Bercak coklat pada malai',
            'Bercak pada daun, ruas, leher malai, malai dan biji-bijian',
            'pembusukan pada pangkal leher malai dan akhirnya malai patah',
            'Daunnya mati dan pelepah daunnya kering',
            'Malai Kosong Sebagian',
            'Bintik-bintik coklat dengan titik tengah berwarna abu-abu atau putih pada daun',
            'Bercak hitam atau coklat tua pada kulit gabahnya',
            'Bintik-bintik kecil berwarna coklat tua atau agak ungu, bentuknya bulat',
            'Bercak pada daun berbentuk lonjong dan tersebar merata pada permukaan daun',
            'Konidiophores dan konidia tampak seperti beludru',
            'Tepi bercak berwarna coklat kemerahan',
            'Gejala awalnya berupa bercak kecil berwarna coklat',
            'Terdapat titik abu-abu di tengah titik tersebut',
            'Ukuran bintik pada butiran lebih besar dan pendek',
            'Ukuran bercak pada upih dan ketiak lebih sempit dibandingkan pada daun',
            'Ukuran bercak, panjang 2-10 mm dan lebar 1 mm',
            'Bintik-bintik berwarna hijau keabu-abuan',
            'Bintik-bintiknya berbentuk elips atau bulat',
            'Bintik-bintik tepi berwarna putih keabu-abuan dan coklat',
            'Bercak membentuk sklerotia berwarna coklat dan mudah dilepaskan',
            'Bercak pada daun bendera',
            'Panjang bercak 2-3 cm',
            'Semua daun menjadi busuk',
            'Bola spora berwarna kuning, halus dan ditutupi selaput',
            'Bola spora menutupi bagian bunga',
            'Butir beras menjadi bola spora',
            'Satu malai hanya beberapa bulir bulir yang terinfeksi',
            'Selaputnya pecah dan warnanya menjadi oranye hingga kuning kehijauan atau hijau kehitaman',
            'Tidak banyak malai yang dihasilkan',
            'Pertumbuhan tanaman terhambat',
            'Daun berwarna kekuningan',
            'Daun kekuningan dengan bercak coklat',
            'Daun menjadi pendek, sempit berwarna hijau',
            'Jumlah anakan banyak, kaku seperti sapu, namun tidak produktif',
            'Garis basah pada bagian pinggir daun atau bagian daun yang luka',
            'Daun yang layu menjadi busuk',
            'Daunnya layu seperti tersiram air panas',
            'Daun menjadi keriput',
            'Gejala layu pada tanaman muda',
            'Daun berwarna kuning hingga jingga dari pucuk daun ke arah pangkal',
            'Jumlah anakan berkurang',
            'Terdapat bercak coklat kehitaman pada bulirnya',
            'Terlihat bercak coklat sebab infeksi serangga yang menular pada daun tua',
            'Tampak seperti bintik pada daun muda',
            'Terdapat Spot-Spot',
            'Daun Kekuningan Hingga Tanaman Mati',
            'Tanaman Menjadi Layu',
            'Daun Menjadi Kering',
            'Daun Kering Berwarna Kecoklatan Seperti Tersiram Air Panas',
            'Bibit yang Tumbuh Menjadi Rusak',
            'Malai yang Berbunga Rusak',
            'Ukuran Kerusakan Potongan sebesar 45°',
            'Sebagian Batang Terpotong',
            'Tangkai Padi Habis'

        ];

        foreach ($gejala as $item) {
            $kodeGejala = alternatif::kode('G', 'gejala_opt_padis');

            gejalaOptPadi::create([
                'kodeGejala' => $kodeGejala,
                'gejala' => $item
            ]);
        }

        $kategori = [
            [
                'kategori' => 'Yakin',
                'bobot' => 0.633346
            ],
            [
                'kategori' => 'Mungkin',
                'bobot' => 0.260498
            ],
            [
                'kategori' => 'Tidak Yakin',
                'bobot' => 0.106156
            ],

        ];

        foreach ($kategori as $item) {
            kategoriGejala::create($item);
        }

        $tabelKeputusan = [
            ['opt' => 1, 'gejala' => 1, 'kategori' => 3],
            ['opt' => 1, 'gejala' => 2, 'kategori' => 1],
            ['opt' => 1, 'gejala' => 3, 'kategori' => 1],
            ['opt' => 1, 'gejala' => 4, 'kategori' => 2],
            ['opt' => 1, 'gejala' => 5, 'kategori' => 3],
            ['opt' => 1, 'gejala' => 6, 'kategori' => 3],
            ['opt' => 1, 'gejala' => 7, 'kategori' => 3],
            ['opt' => 1, 'gejala' => 8, 'kategori' => 3],

            ['opt' => 4, 'gejala' => 1, 'kategori' => 3],

            ['opt' => 2, 'gejala' => 9, 'kategori' => 1],
            ['opt' => 2, 'gejala' => 10, 'kategori' => 3],
            ['opt' => 2, 'gejala' => 11, 'kategori' => 1],
            ['opt' => 2, 'gejala' => 12, 'kategori' => 3],
            ['opt' => 2, 'gejala' => 13, 'kategori' => 2],

            ['opt' => 3, 'gejala' => 14, 'kategori' => 1],
            ['opt' => 3, 'gejala' => 15, 'kategori' => 3],
            ['opt' => 3, 'gejala' => 16, 'kategori' => 3],
            ['opt' => 3, 'gejala' => 17, 'kategori' => 2],
            ['opt' => 3, 'gejala' => 18, 'kategori' => 2],
            ['opt' => 3, 'gejala' => 19, 'kategori' => 2],

            ['opt' => 4, 'gejala' => 20, 'kategori' => 2],
            ['opt' => 4, 'gejala' => 21, 'kategori' => 2],
            ['opt' => 4, 'gejala' => 22, 'kategori' => 1],
            ['opt' => 4, 'gejala' => 23, 'kategori' => 2],
            ['opt' => 4, 'gejala' => 24, 'kategori' => 2],
            ['opt' => 4, 'gejala' => 25, 'kategori' => 2],
            ['opt' => 4, 'gejala' => 26, 'kategori' => 3],

            ['opt' => 7, 'gejala' => 20, 'kategori' => 2],

            ['opt' => 5, 'gejala' => 27, 'kategori' => 1],
            ['opt' => 5, 'gejala' => 28, 'kategori' => 1],
            ['opt' => 5, 'gejala' => 29, 'kategori' => 1],
            ['opt' => 5, 'gejala' => 30, 'kategori' => 1],
            ['opt' => 5, 'gejala' => 31, 'kategori' => 1],

            ['opt' => 6, 'gejala' => 32, 'kategori' => 2],
            ['opt' => 6, 'gejala' => 33, 'kategori' => 1],
            ['opt' => 6, 'gejala' => 34, 'kategori' => 3],
            ['opt' => 6, 'gejala' => 35, 'kategori' => 3],
            ['opt' => 6, 'gejala' => 36, 'kategori' => 3],
            ['opt' => 6, 'gejala' => 37, 'kategori' => 2],

            ['opt' => 8, 'gejala' => 32, 'kategori' => 2],
            ['opt' => 8, 'gejala' => 33, 'kategori' => 1],

            ['opt' => 9, 'gejala' => 34, 'kategori' => 3],

            ['opt' => 7, 'gejala' => 38, 'kategori' => 2],
            ['opt' => 7, 'gejala' => 39, 'kategori' => 3],
            ['opt' => 7, 'gejala' => 40, 'kategori' => 3],
            ['opt' => 7, 'gejala' => 41, 'kategori' => 3],
            ['opt' => 7, 'gejala' => 42, 'kategori' => 3],

            ['opt' => 8, 'gejala' => 43, 'kategori' => 2],
            ['opt' => 8, 'gejala' => 44, 'kategori' => 3],
            ['opt' => 8, 'gejala' => 45, 'kategori' => 3],
            ['opt' => 8, 'gejala' => 46, 'kategori' => 3],
            ['opt' => 8, 'gejala' => 47, 'kategori' => 3],

            ['opt' => 9, 'gejala' => 48, 'kategori' => 1],
            ['opt' => 9, 'gejala' => 49, 'kategori' => 3],
            ['opt' => 9, 'gejala' => 50, 'kategori' => 3],
            ['opt' => 9, 'gejala' => 51, 'kategori' => 1],
            ['opt' => 9, 'gejala' => 52, 'kategori' => 1],

            ['opt' => 10, 'gejala' => 48, 'kategori' => 1],

            ['opt' => 10, 'gejala' => 53, 'kategori' => 3],
            ['opt' => 10, 'gejala' => 54, 'kategori' => 1],
            ['opt' => 10, 'gejala' => 55, 'kategori' => 1],
            ['opt' => 10, 'gejala' => 56, 'kategori' => 1],
            ['opt' => 10, 'gejala' => 57, 'kategori' => 1],

        ];

        foreach ($tabelKeputusan as $item) {
            tabelKeputusan::create($item);
        }

        $penanggulangan = [
            [
                'opt' => 1,
                'pencegahan' => "Melakukan pemupukan berimbang, memilih varietas yang memiliki ketahanan stabil, memperhatikan waktu tanam agar tidak menanam pada suhu rendah, membasmi pertanaman yang sakit untuk mengurangi sumber infeksi.",
                'penanganan' => "Mengaplikasikan fungisida yang berbahan aktif, seperti: metil tiofanat, heksakonazol, trisiklazol, kasugamisin hidroklorida + tembaga oksiklorida, mankozeb + karbendazim, tembaga oksida, dan sebagainya.",
            ],
            [
                'opt' => 2,
                'pencegahan' => "Memilih benih bermutu, penyesuaian sarana tata air, pemupukan seimbang, tanam serentak, Melakukan pergiliran tanaman dengan jenis yang bukan inangnya, serta merendam biji dengan air panas yang dicampur fungisida",
                'penanganan' => "Untuk mematikan patogen, lakukan sanitasi dengan mengangkut jerami keluar, Mengaplikasikan fungisida yang berbahan aktif, seperti: difenokonazol, tebukonazol, heksakonazol, belerang, tebukonazol + trifloksistrobin, azoksistrobin + difenokonazol, propikonazol + prokloraz, dan sebagainya.",
            ],
            [
                'opt' => 3,
                'pencegahan' => "Memusnahkan tanggul dan jerami yang terinfeksi, gunakan benih yang bebas dari penyakit, kurangi penggunaan pupuk nitrogen dan melakukan pemupukan seimbang.",
                'penanganan' => "Menggunakan bakterisida nordox dengan dosis 0,5 hingga 1 gram per liter air atau agrept dengan dosis 1 gram per liter air pada tanaman yang terinfeksi, dan berakan tanah setelah panen.",
            ],
            [
                'opt' => 4,
                'pencegahan' => "Menggunakan varietas tahan, melakukan pemupukan seimbang, pemberian jarak tanam pada proses penanaman, sanitasi lingkunan penanaman dari gulma yang menjadi inang alternatif bagi pantogen.",
                'penanganan' => "Penyemprotan antagonis Trichoderma pada pangkal padi secara merata di sore hari, mengaplikasikan fungisida dengan dosis yang tepat. Jenis fungisida berbahan aktif: difenokonazol, tebukonazol, heksakonazol, belerang, tebukonazol + trifloksistrobin, azoksistrobin + difenokonazol, propikonazol + prokloraz, dan sebagainya.",
            ],
            [
                'opt' => 5,
                'pencegahan' => "Menggunakan varietas tahan, menghidari penggunaan pupuk nitrogen berlebihan, melakukan pergiliran tanam dengan tanaman yang bukan inang.",
                'penanganan' => "Mengaplikasikan fungisida pada fase pembungaan terutama pada saat kondisi lahan memiliki kelembaban tinggi ketika suhu rendah, dan melakukan pemantauan rutin.",
            ],
            [
                'opt' => 6,
                'pencegahan' => "Melakukan pola tanam bergiliran dengan tanaman yang bukan padi, melakukan sanitasi pada area tanaman yang sakit dan semak-semak yang merupakan sumber virus.",
                'penanganan' => "Mengaplikasikan insektisida karbofuran pada persemaian sehari sebelum benih ditanam, serta di lahan sehari sebelum pengolahan tanah terakhir, jika ditemukan WBC di persemaian maupun tanaman hingga beumur 30 HST, lakukan penyemprotan.",
            ],
            [
                'opt' => 7,
                'pencegahan' => "Menggunakan varietas tahan, melakukan sanitasi pada tanggul atau jerami yang terinfeksi, memastikan jerami dari tanaman sakit sudah terdekomposisi sempurna sebelum tanam pindah.",
                'penanganan' => "menggunakan pupuk N sesuai takaran, melakukan seleksi, dan perlakuan benih menggunakan agens hayati sesuai anjuran, contohnya gunakan agens hayati berjenis Paenibacillus polymyxa di sore hari ketika padi berumur 14, 28, dan 42 HST.",
            ],
            [
                'opt' => 8,
                'pencegahan' => "Memberantas sumber infeksi seperti tanaman sakit, singgang, dan rumput inang. Melakukan pemupukan seimbang, serta irigasi berseling untuk meningkatkan ketahanan tanaman.",
                'penanganan' => "Menghilangkan sumber inokulum tungro, melakukan  insektisida sehari sebelum menebar benih pada daerah edemis tungro ketika serangga penular masih dalam jumlah sedikit.",
            ],
            [
                'opt' => 9,
                'pencegahan' => "Melakukan penanaman secara serentak, menggunakan berbagai jenis varietas padi berdasarkan tingkat ketahanannya terhadap wereng batang coklat (WBC), melakukan pergiliran tanaman dengan yang bukan inang WBC.",
                'penanganan' => "Jika populasi masih rendah lakukan pengendalian hayati menggunakan cendawan pantogen; jika pengelolaan agroekosistem telah dilakukan namun populasi WBC masih tinggi, maka dapat menggunakan insektisida kimia seperti:  imidakloprid, dimehipo, BPMC, karbofuran, dan sebagainya.",
            ],
            [
                'opt' => 10,
                'pencegahan' => "Melakukan penanaman serentak di area lahan yang luas, membersihkan area lahan dari semak-semak dan rumput liar untuk mencegah tikus membuat sarang, memperkecil ukuran pematang dan tanggul di sekitar lahan.",
                'penanganan' => "Meletakkan umpan beracun pada area yang banyak dilintasi tikus, pengasapan dan memasang perangkap bambu, pemburuan serentak pada fase awal tanam untuk menekan populasi sejak dini.",
            ],
        ];

        foreach ($penanggulangan as $item) {
            penanggulanganOpt::create($item);
        }
    }
}

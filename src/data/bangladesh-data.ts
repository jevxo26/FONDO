// src/data/bangladesh-address.ts

export interface UpazilaOrThana {
    name: string;
    isThana?: boolean;
}

export interface DistrictData {
    name: string;
    upazilas: string[];
    thanas?: string[];
}

export interface DivisionData {
    division: string;
    districts: DistrictData[];
}

export const BANGLADESH_ADDRESS_DATA: DivisionData[] = [
    {
        division: "Dhaka",
        districts: [
            {
                name: "Dhaka",
                upazilas: ["Savar", "Dhamrai", "Keraniganj", "Nawabganj", "Dohar"],
                thanas: [
                    "Dhanmondi",
                    "Gulshan",
                    "Mirpur",
                    "Uttara",
                    "Mohammadpur",
                    "Banani",
                    "Tejgaon",
                    "Badda",
                    "Paltan",
                    "Shahbagh",
                    "Khilgaon",
                    "Rampura",
                    "Jatrabari",
                ],
            },
            {
                name: "Gazipur",
                upazilas: ["Gazipur Sadar", "Kaliakair", "Kapasia", "Sreepur", "Kaliganj"],
            },
            {
                name: "Narayanganj",
                upazilas: ["Narayanganj Sadar", "Araihazar", "Bandar", "Rupganj", "Sonargaon"],
            },
            {
                name: "Faridpur",
                upazilas: ["Faridpur Sadar", "Alfadanga", "Bhanga", "Boalmari", "Charbhadrasan", "Madhukhali", "Nagarkanda", "Sadarpur", "Saltha"],
            },
            {
                name: "Gopalganj",
                upazilas: ["Gopalganj Sadar", "Kashiani", "Kotalipara", "Muksudpur", "Tungipara"],
            },
            {
                name: "Kishoreganj",
                upazilas: ["Kishoreganj Sadar", "Bhitamoin", "Bhairab", "Hossainpur", "Itna", "Karimganj", "Katiadi", "Kulikanda", "Mithamain", "Nikli", "Pakundia", "Tarail"],
            },
            {
                name: "Madaripur",
                upazilas: ["Madaripur Sadar", "Kalkini", "Rajoir", "Shibchar", "Dasar"],
            },
            {
                name: "Manikganj",
                upazilas: ["Manikganj Sadar", "Singair", "Saturia", "Shibalaya", "Harirampur", "Ghior", "Daulatpur"],
            },
            {
                name: "Munshiganj",
                upazilas: ["Munshiganj Sadar", "Gazaria", "Tongibari", "Sreenagar", "Lohajang", "Sirajdikhan"],
            },
            {
                name: "Rajbari",
                upazilas: ["Rajbari Sadar", "Baliakandi", "Goalandaghat", "Pangsha", "Kalukhali"],
            },
            {
                name: "Shariatpur",
                upazilas: ["Shariatpur Sadar", "Bhedarganj", "Damudya", "Gosairhat", "Naria", "Zajira"],
            },
            {
                name: "Tangail",
                upazilas: ["Tangail Sadar", "Basail", "Bhuapur", "Delduar", "Dhanbari", "Ghapargaon", "Gopalpur", "Kalihati", "Madhupur", "Mirzapur", "Nagarpur", "Sakhipur"],
            },
        ],
    },
    {
        division: "Chattogram",
        districts: [
            {
                name: "Chattogram",
                upazilas: ["Anwara", "Banshkhali", "Boalkhali", "Chandanaish", "Fatikchhari", "Hathazari", "Lohagara", "Mirsarai", "Patiya", "Rangunia", "Raozan", "Sandwip", "Satkania", "Sitakunda"],
                thanas: ["Kotwali", "Panchlaish", "Double Mooring", "Halishahar", "Patenga", "Khulshi"],
            },
            {
                name: "Cox's Bazar",
                upazilas: ["Cox's Bazar Sadar", "Chakaria", "Kutubdia", "Maheshkhali", "Ramu", "Teknaf", "Ukhia", "Pekua", "Eidgaon"],
            },
            {
                name: "Cumilla",
                upazilas: ["Cumilla Sadar", "Barura", "Brahmanpara", "Burichang", "Chandina", "Chouddagram", "Daudkandi", "Debidwar", "Homna", "Laksam", "Monohargonj", "Meghna", "Muradnagar", "Nangalkot", "Titas"],
            },
            {
                name: "Feni",
                upazilas: ["Feni Sadar", "Chhagalnaiya", "Daganbhuiyan", "Parshuram", "Fulgazi", "Sonavazi"],
            },
            {
                name: "Noakhali",
                upazilas: ["Noakhali Sadar", "Begumganj", "Chatkhil", "Companiganj", "Hatiya", "Senbagh", "Subarnachar", "Kabirhat"],
            },
            {
                name: "Brahmanbaria",
                upazilas: ["Brahmanbaria Sadar", "Ashuganj", "Bancharampur", "Kasba", "Nabinagar", "Nasirnagar", "Sarail", "Bijoynagar"],
            },
            {
                name: "Chandpur",
                upazilas: ["Chandpur Sadar", "Faridganj", "Haimchar", "Hajiganj", "Kachua", "Matlab North", "Matlab South", "Shahrasti"],
            },
            {
                name: "Khagrachhari",
                upazilas: ["Khagrachhari Sadar", "Dighinala", "Lakshmichhari", "Mahalchhari", "Manikchhari", "Matiranga", "Panchhari", "Ramgarh"],
            },
            {
                name: "Rangamati",
                upazilas: ["Rangamati Sadar", "Belaichhari", "Barki", "Juraichhari", "Kaptai", "Kawkhali", "Langadu", "Naniarchar", "Rajasthali"],
            },
            {
                name: "Bandarban",
                upazilas: ["Bandarban Sadar", "Ali Kadam", "Thanchi", "Lama", "Naikhongchhari", "Rowangchhari", "Ruma"],
            },
            {
                name: "Lakshmipur",
                upazilas: ["Lakshmipur Sadar", "Raipur", "Ramganj", "Ramgati", "Kamalnagar"],
            },
        ],
    },
    {
        division: "Rajshahi",
        districts: [
            {
                name: "Rajshahi",
                upazilas: ["Bagha", "Bagmara", "Charghat", "Durgapur", "Godagari", "Mohanpur", "Paba", "Puthia", "Tanore"],
                thanas: ["Boalia", "Rajpara"],
            },
            {
                name: "Bogra",
                upazilas: ["Bogra Sadar", "Adamdighi", "Dhunat", "Dhupchanchia", "Gabtali", "Kahaloo", "Nandigram", "Sariakandi", "Sherpur", "Shibganj", "Sonatala"],
            },
            {
                name: "Pabna",
                upazilas: ["Pabna Sadar", "Atgharia", "Bera", "Bhangura", "Chatmohar", "Faridpur", "Ishwardi", "Santhia", "Sujanagar"],
            },
            {
                name: "Sirajganj",
                upazilas: ["Sirajganj Sadar", "Belkuchi", "Chauhali", "Kamarkhanda", "Kazipur", "Rayganj", "Shahjadpur", "Tarash", "Ullapara"],
            },
            {
                name: "Naogaon",
                upazilas: ["Naogaon Sadar", "Atrai", "Badalgachhi", "Dhamoirhat", "Manda", "Niamatpur", "Patnitala", "Porsha", "Raninagar", "Sapahar"],
            },
            {
                name: "Natore",
                upazilas: ["Natore Sadar", "Bagatipara", "Baraigram", "Gurudaspur", "Lalpur", "Singra"],
            },
            {
                name: "Chapai Nawabganj",
                upazilas: ["Chapai Nawabganj Sadar", "Bholahat", "Gomastapur", "Nachole", "Shibganj"],
            },
            {
                name: "Joypurhat",
                upazilas: ["Joypurhat Sadar", "Akkelpur", "Kalai", "Khetlal", "Panchbibi"],
            },
        ],
    },
    {
        division: "Khulna",
        districts: [
            {
                name: "Khulna",
                upazilas: ["Batiaghata", "Dacope", "Dumuria", "Dighalia", "Koyra", "Paikgachha", "Phultala", "Rupsha", "Terokhada"],
                thanas: ["Khalishpur", "Sonadanga", "Kotwali"],
            },
            {
                name: "Jeshore",
                upazilas: ["Jeshore Sadar", "Abhaynagar", "Bagherpara", "Chaugachha", "Jhikargachha", "Keshabpur", "Manirampur", "Sharsha"],
            },
            {
                name: "Kushtia",
                upazilas: ["Kushtia Sadar", "Kumarkhali", "Daulatpur", "Mirpur", "Bheramara", "Khoksa"],
            },
            {
                name: "Satkhira",
                upazilas: ["Satkhira Sadar", "Assasuni", "Debhata", "Kalaroa", "Kaliganj", "Shyamnagar", "Tala"],
            },
            {
                name: "Bagerhat",
                upazilas: ["Bagerhat Sadar", "Chitalmari", "Fakirhat", "Kachua", "Mollahat", "Mongla", "Morrelganj", "Rampal", "Sarankhola"],
            },
            {
                name: "Chuadanga",
                upazilas: ["Chuadanga Sadar", "Alamdanga", "Damurhuda", "Jibannagar"],
            },
            {
                name: "Jhenaidah",
                upazilas: ["Jhenaidah Sadar", "Harakunda", "Kaliganj", "Kotchandpur", "Maheshpur", "Shailkupa"],
            },
            {
                name: "Meherpur",
                upazilas: ["Meherpur Sadar", "Gangni", "Mujibnagar"],
            },
            {
                name: "Narail",
                upazilas: ["Narail Sadar", "Kalia", "Lohagara"],
            },
            {
                name: "Magura",
                upazilas: ["Magura Sadar", "Mohammadpur", "Shalsha", "Sreepur"],
            },
        ],
    },
    {
        division: "Barisal",
        districts: [
            {
                name: "Barisal",
                upazilas: ["Barisal Sadar", "Agailjhara", "Babuganj", "Bakerganj", "Banaripara", "Gaurnadi", "Hizla", "Mehendiganj", "Muladi", "Wazirpur"],
            },
            {
                name: "Bhola",
                upazilas: ["Bhola Sadar", "Burhanuddin", "Char Fasson", "Daulatkhan", "Lalmohan", "Manpura", "Tazumuddin"],
            },
            {
                name: "Patuakhali",
                upazilas: ["Patuakhali Sadar", "Baophal", "Dashmina", "Galachipa", "Kalapara", "Mirzaganj", "Rangabali", "Dumki"],
            },
            {
                name: "Pirojpur",
                upazilas: ["Pirojpur Sadar", "Bhandaria", "Kawkhali", "Mathbaria", "Nazirpur", "Nesarabad", "Zianagar"],
            },
            {
                name: "Barguna",
                upazilas: ["Barguna Sadar", "Amtali", "Bamna", "Betagi", "Patharghata", "Taltali"],
            },
            {
                name: "Jhalokati",
                upazilas: ["Jhalokati Sadar", "Kathalia", "Nalchity", "Rajapur"],
            },
        ],
    },
    {
        division: "Sylhet",
        districts: [
            {
                name: "Sylhet",
                upazilas: ["Sylhet Sadar", "Balaganj", "Beanibazar", "Bishwanath", "Companiganj", "Fenchuganj", "Golapganj", "Gowainghat", "Jaintiapur", "Kanaighat", "Zakiganj", "South Surma"],
            },
            {
                name: "Moulvibazar",
                upazilas: ["Moulvibazar Sadar", "Barlekha", "Juri", "Kamalganj", "Kulaura", "Rajnagar", "Sreemangal"],
            },
            {
                name: "Habiganj",
                upazilas: ["Habiganj Sadar", "Ajmiriganj", "Bahubal", "Baniyachong", "Chunarughat", "Lakhai", "Madhabpur", "Nabiganj", "Shayestaganj"],
            },
            {
                name: "Sunamganj",
                upazilas: ["Sunamganj Sadar", "Bishwamharpur", "Chhatak", "Derai", "Dharamapasha", "Dowarabazar", "Jagannathpur", "Jamalganj", "Sullah", "Tahirpur", "Madhyanagar"],
            },
        ],
    },
    {
        division: "Rangpur",
        districts: [
            {
                name: "Rangpur",
                upazilas: ["Rangpur Sadar", "Badarganj", "Gangachara", "Kaunia", "Mithapukur", "Pirgachha", "Pirganj", "Taraganj"],
            },
            {
                name: "Dinajpur",
                upazilas: ["Dinajpur Sadar", "Birampur", "Birganj", "Biral", "Bochaganj", "Chirirbandar", "Phulbari", "Ghoraghat", "Hakimpur", "Kaharole", "Khanshama", "Nawabganj", "Parbatipur"],
            },
            {
                name: "Gaibandha",
                upazilas: ["Gaibandha Sadar", "Fulchhari", "Gobindaganj", "Palashbari", "Sadullapur", "Saghata", "Sundarganj"],
            },
            {
                name: "Kurigram",
                upazilas: ["Kurigram Sadar", "Bhurungamari", "Char Rajibpur", "Chilmari", "Phulbari", "Nageshwari", "Rajarhat", "Roumari", "Ulipur"],
            },
            {
                name: "Nilphamari",
                upazilas: ["Nilphamari Sadar", "Dimla", "Domar", "Jaldhaka", "Kishoreganj", "Saidpur"],
            },
            {
                name: "Panchagarh",
                upazilas: ["Panchagarh Sadar", "Atwari", "Boda", "Debiganj", "Tetulia"],
            },
            {
                name: "Thakurgaon",
                upazilas: ["Thakurgaon Sadar", "Baliadangi", "Haripur", "Pirganj", "Ranisankail"],
            },
            {
                name: "Lalmonirhat",
                upazilas: ["Lalmonirhat Sadar", "Aditmari", "Hatibandha", "Kaliganj", "Patgram"],
            },
        ],
    },
    {
        division: "Mymensingh",
        districts: [
            {
                name: "Mymensingh",
                upazilas: ["Mymensingh Sadar", "Bhaluka", "Dhobaura", "Fulbaria", "Gaffargaon", "Gauripur", "Haluaghat", "Ishwarganj", "Muktagachha", "Nandail", "Phulpur", "Trishal", "TaraKanda"],
            },
            {
                name: "Jamalpur",
                upazilas: ["Jamalpur Sadar", "Baksiganj", "Dewanganj", "Isampur", "Madarganj", "Melandahn", "Sarishabari"],
            },
            {
                name: "Netrokona",
                upazilas: ["Netrokona Sadar", "Atpara", "Barhatta", "Durgapur", "Khaliajuri", "Kalmakanda", "Kendra", "Madan", "Mohanganj", "Purbadhala"],
            },
            {
                name: "Sherpur",
                upazilas: ["Sherpur Sadar", "Jhenaigati", "Nakla", "Nalitabari", "Sreebardi"],
            },
        ],
    },
];

// Helper functions for easy querying
export const getAllDivisions = () => BANGLADESH_ADDRESS_DATA.map((d) => d.division);

export const getDistrictsByDivision = (divisionName: string) => {
    const divData = BANGLADESH_ADDRESS_DATA.find((d) => d.division === divisionName);
    return divData ? divData.districts.map((d) => d.name) : [];
};

export const getSubLocationsByDistrict = (districtName: string) => {
    for (const div of BANGLADESH_ADDRESS_DATA) {
        const dist = div.districts.find((d) => d.name === districtName);
        if (dist) {
            return {
                upazilas: dist.upazilas || [],
                thanas: dist.thanas || [],
            };
        }
    }
    return { upazilas: [], thanas: [] };
};

export const getAllDistricts = () => {
    return BANGLADESH_ADDRESS_DATA.flatMap((div) => div.districts.map((d) => d.name));
};
import { WorkoutProgram } from "../types";

export const sefaProgram: WorkoutProgram = {
    id: "sefa-ozel-program-v1",
    programName: "SEFA ÖZEL - 3 AYLIK GYM PROGRAMI",
    targetGoal: "Body Recomposition - Kas Yapımı & Yağ Yakımı",
    difficulty: "Orta Seviye",
    createdAt: new Date().toISOString(),
    days: [
        {
            dayName: "Pazartesi: Üst Vücut A (Güç Odaklı)",
            exercises: [
                {
                    name: "Isınma (Koşu bandı/ip atlama)",
                    sets: "1",
                    reps: "5 dk",
                    rest: "-",
                    notes: "Kalp atışı yükselt",
                    guide: { howTo: "Hafif tempo ile başla, yavaşça artır.", videoLinks: [] }
                },
                {
                    name: "Bench Press (Düz)",
                    sets: "4",
                    reps: "6-8",
                    rest: "90 sn",
                    notes: "Ana göğüs hareketi",
                    guide: { howTo: "Barı meme ucuna indir, dirsekleri kilitlemeden it.", videoLinks: [] }
                },
                {
                    name: "Incline Dumbbell Press",
                    sets: "3",
                    reps: "8-10",
                    rest: "75 sn",
                    notes: "Üst göğüs",
                    guide: { howTo: "Sehpayı 30-45 derece yap, dambılları kontrollü indir.", videoLinks: [] }
                },
                {
                    name: "Overhead Press (Ayakta)",
                    sets: "4",
                    reps: "6-8",
                    rest: "90 sn",
                    notes: "Omuz kütlesi",
                    guide: { howTo: "Beli bükme, barı başının üstüne dik it.", videoLinks: [] }
                },
                {
                    name: "Lateral Raise",
                    sets: "3",
                    reps: "12-15",
                    rest: "60 sn",
                    notes: "Omuz genişliği",
                    guide: { howTo: "Dirsekler hafif bükük, serçe parmak tavana baksın.", videoLinks: [] }
                },
                {
                    name: "Triceps Dips (Makine/Sehpa)",
                    sets: "3",
                    reps: "8-10",
                    rest: "75 sn",
                    notes: "Kol arkası",
                    guide: { howTo: "Gövde dik, sadece kollardan güç al.", videoLinks: [] }
                },
                {
                    name: "Triceps Pushdown",
                    sets: "3",
                    reps: "10-12",
                    rest: "60 sn",
                    notes: "Triceps detayı",
                    guide: { howTo: "Dirsekleri vücuda sabitle, sadece ön kol hareket etsin.", videoLinks: [] }
                },
                {
                    name: "Face Pull",
                    sets: "3",
                    reps: "15-20",
                    rest: "45 sn",
                    notes: "Arka omuz/duruş",
                    guide: { howTo: "Halatı alnına çek, dirsekleri geriye aç.", videoLinks: [] }
                }
            ]
        },
        {
            dayName: "Salı: Alt Vücut A (Güç Odaklı)",
            exercises: [
                {
                    name: "Isınma (Bisiklet)",
                    sets: "1",
                    reps: "5 dk",
                    rest: "-",
                    notes: "Dizleri hazırla",
                    guide: { howTo: "Düşük dirençte hızlı pedal çevir.", videoLinks: [] }
                },
                {
                    name: "Squat (Barbell)",
                    sets: "4",
                    reps: "6-8",
                    rest: "2 dk",
                    notes: "Temel güç (Menüsküs varsa dikkat, ağrı olursa ağırlığı düşür)",
                    guide: { howTo: "Topuklara bas, dizler ayak ucunu geçebilir ama içe çökmesin.", videoLinks: [] }
                },
                {
                    name: "Romanian Deadlift",
                    sets: "3",
                    reps: "8-10",
                    rest: "90 sn",
                    notes: "Hamstring",
                    guide: { howTo: "Dizler hafif bükük, kalçayı geriye iterek eğil.", videoLinks: [] }
                },
                {
                    name: "Leg Press",
                    sets: "3",
                    reps: "10-12",
                    rest: "90 sn",
                    notes: "Quad hacmi",
                    guide: { howTo: "Ayakları plakanın ortasına koy, dizleri kilitleme.", videoLinks: [] }
                },
                {
                    name: "Walking Lunges",
                    sets: "3",
                    reps: "10/bacak",
                    rest: "75 sn",
                    notes: "Denge + güç",
                    guide: { howTo: "Büyük adımlar at, arka diz yere yaklaşsın.", videoLinks: [] }
                },
                {
                    name: "Calf Raise (Ayakta)",
                    sets: "4",
                    reps: "15-20",
                    rest: "45 sn",
                    notes: "Baldır",
                    guide: { howTo: "Topukları iyice düşür, parmak ucunda yüksel.", videoLinks: [] }
                },
                {
                    name: "Plank",
                    sets: "3",
                    reps: "45 sn",
                    rest: "30 sn",
                    notes: "Core stabilitesi",
                    guide: { howTo: "Vücut dümdüz, kalçayı sık.", videoLinks: [] }
                }
            ]
        },
        {
            dayName: "Perşembe: Üst Vücut B (Hacim Odaklı)",
            exercises: [
                {
                    name: "Isınma (Kürek makinesi)",
                    sets: "1",
                    reps: "5 dk",
                    rest: "-",
                    notes: "Sırtı hazırla",
                    guide: { howTo: "Sırtı dik tut, kolları değil sırtı çek.", videoLinks: [] }
                },
                {
                    name: "Barbell Row",
                    sets: "4",
                    reps: "6-8",
                    rest: "90 sn",
                    notes: "Sırt kalınlığı",
                    guide: { howTo: "Gövde yere paralel yakın, barı karın boşluğuna çek.", videoLinks: [] }
                },
                {
                    name: "Lat Pulldown",
                    sets: "3",
                    reps: "8-10",
                    rest: "75 sn",
                    notes: "Sırt genişliği",
                    guide: { howTo: "Geniş tut, göğsüne çek, salarken yavaşlat.", videoLinks: [] }
                },
                {
                    name: "Cable Row (Oturarak)",
                    sets: "3",
                    reps: "10-12",
                    rest: "75 sn",
                    notes: "Sırt detayı",
                    guide: { howTo: "Gövdeyi sabit tut, kürek kemiklerini sıkıştır.", videoLinks: [] }
                },
                {
                    name: "Dumbbell Curl",
                    sets: "3",
                    reps: "10-12",
                    rest: "60 sn",
                    notes: "Biceps kütlesi",
                    guide: { howTo: "Dirsekler sabit, avuç içini yukarı çevirerek kaldır.", videoLinks: [] }
                },
                {
                    name: "Hammer Curl",
                    sets: "3",
                    reps: "10-12",
                    rest: "60 sn",
                    notes: "Bilek/ön kol",
                    guide: { howTo: "Avuç içleri birbirine baksın.", videoLinks: [] }
                },
                {
                    name: "Wrist Curl",
                    sets: "3",
                    reps: "15-20",
                    rest: "45 sn",
                    notes: "Bilek kalınlığı",
                    guide: { howTo: "Ön kollar sehpada, sadece bilekleri bük.", videoLinks: [] }
                },
                {
                    name: "Reverse Wrist Curl",
                    sets: "2",
                    reps: "15-20",
                    rest: "45 sn",
                    notes: "Ön kol dışı",
                    guide: { howTo: "Avuç içi yere baksın, elinin tersini kaldır.", videoLinks: [] }
                },
                {
                    name: "Rear Delt Fly",
                    sets: "3",
                    reps: "12-15",
                    rest: "45 sn",
                    notes: "Arka omuz",
                    guide: { howTo: "Dambılları yana aç, serçe parmak önde olsun.", videoLinks: [] }
                }
            ]
        },
        {
            dayName: "Cuma: Alt Vücut B (Hacim + Patlayıcılık)",
            exercises: [
                {
                    name: "Isınma (Dinamik germe)",
                    sets: "1",
                    reps: "5 dk",
                    rest: "-",
                    notes: "Eklem mobilitesi",
                    guide: { howTo: "Bacak savurma, squat beklemeleri.", videoLinks: [] }
                },
                {
                    name: "Front Squat",
                    sets: "3",
                    reps: "8-10",
                    rest: "90 sn",
                    notes: "Quad odaklı",
                    guide: { howTo: "Barı ön omzuna al, dirsekler yüksek, dik çök.", videoLinks: [] }
                },
                {
                    name: "Bulgarian Split Squat",
                    sets: "3",
                    reps: "10/bacak",
                    rest: "75 sn",
                    notes: "Tek bacak gücü",
                    guide: { howTo: "Arka ayağı sehpaya koy, öndeki bacakla çök.", videoLinks: [] }
                },
                {
                    name: "Leg Curl (Yatarak)",
                    sets: "3",
                    reps: "10-12",
                    rest: "60 sn",
                    notes: "Hamstring izolasyonu",
                    guide: { howTo: "Kalçayı pedden kaldırma.", videoLinks: [] }
                },
                {
                    name: "Leg Extension",
                    sets: "3",
                    reps: "12-15",
                    rest: "60 sn",
                    notes: "Quad tanımı",
                    guide: { howTo: "Tepe noktada 1 saniye sık.", videoLinks: [] }
                },
                {
                    name: "Box Jump",
                    sets: "3",
                    reps: "8",
                    rest: "90 sn",
                    notes: "Patlayıcılık (Futbol için)",
                    guide: { howTo: "Çömel ve patlayıcı bir şekilde kutuya sıçra.", videoLinks: [] }
                },
                {
                    name: "Calf Raise (Oturarak)",
                    sets: "3",
                    reps: "15-20",
                    rest: "45 sn",
                    notes: "Baldır alt",
                    guide: { howTo: "Hareketi tam aralıkta yap.", videoLinks: [] }
                },
                {
                    name: "Ab Wheel / Crunch",
                    sets: "3",
                    reps: "12-15",
                    rest: "45 sn",
                    notes: "Karın",
                    guide: { howTo: "Karın kaslarını sıkarak katlan.", videoLinks: [] }
                }
            ]
        },
        {
            dayName: "Ekstra: Ev - Ab Wheel Rutini",
            exercises: [
                { name: "Ab Wheel Rollout", sets: "3", reps: "10-12", rest: "45 sn", notes: "Dizler yerde başla", guide: {howTo: "Belini çukurlaştırma.", videoLinks: []} },
                { name: "Plank", sets: "2", reps: "45-60 sn", rest: "30 sn", notes: "Core stabilite", guide: {howTo: "Sabit dur.", videoLinks: []} },
                { name: "Mountain Climber", sets: "2", reps: "20/bacak", rest: "30 sn", notes: "Kardiyo etkisi", guide: {howTo: "Dizleri göğse çek.", videoLinks: []} }
            ]
        },
        {
            dayName: "Ekstra: Ev - Şınav Rutini",
            exercises: [
                { name: "Normal Şınav", sets: "3", reps: "15-20", rest: "45 sn", notes: "Göğüs genel", guide: {howTo: "Göğüs yere değsin.", videoLinks: []} },
                { name: "Dar Tutuş Şınav", sets: "2", reps: "12-15", rest: "45 sn", notes: "Triceps", guide: {howTo: "Eller elmas şeklinde.", videoLinks: []} },
                { name: "Geniş Tutuş Şınav", sets: "2", reps: "12-15", rest: "45 sn", notes: "Göğüs dış", guide: {howTo: "Eller omuzdan geniş.", videoLinks: []} }
            ]
        },
        {
            dayName: "Ekstra: Ev - Direnç Bandı",
            exercises: [
                { name: "Band Biceps Curl", sets: "3", reps: "15-20", rest: "30 sn", notes: "Kol ön", guide: {howTo: "Bandın ortasına bas.", videoLinks: []} },
                { name: "Band Shoulder Press", sets: "3", reps: "15-20", rest: "30 sn", notes: "Omuz", guide: {howTo: "Ayakta, bandı yukarı it.", videoLinks: []} },
                { name: "Band Pull Apart", sets: "3", reps: "20", rest: "30 sn", notes: "Arka omuz", guide: {howTo: "Kolları yana açarak bandı ger.", videoLinks: []} }
            ]
        }
    ]
};
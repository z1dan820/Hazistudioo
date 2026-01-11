document.addEventListener("DOMContentLoaded", () => {
    const navContainer = document.getElementById("app-navigation");
    
    // Ambil nama file saat ini (misal: booking.html)
    const path = window.location.pathname;
    const page = path.split("/").pop() || "index.html"; // Default ke index kalau root "/"

    // Konfigurasi Menu
    const menus = [
        {
            name: "Home",
            link: "index.html",
            icon: `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path>`,
            activeCheck: ["index.html", ""] // Aktif jika file ini atau root
        },
        {
            name: "Booking",
            link: "booking.html",
            icon: `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>`,
            activeCheck: ["booking.html"]
        },
        {
            name: "Lokasi",
            link: "index.html#location-section", // Selalu arahkan ke anchor di index
            icon: `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>`,
            activeCheck: [] // Lokasi tidak pernah "Active" (selalu abu-abu karena cuma anchor)
        },
        {
            name: "Kontak",
            link: "kontak.html",
            icon: `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path>`,
            activeCheck: ["kontak.html"]
        }
    ];

    // Generate HTML
    let menuHTML = "";
    
    menus.forEach(item => {
        // Cek apakah menu ini sedang aktif?
        const isActive = item.activeCheck.includes(page);
        
        // Warna Icon & Text (Putih kalau aktif, Abu kalau tidak)
        const colorClass = isActive ? "text-white" : "text-gray-500 hover:text-white";
        const fontClass = isActive ? "font-bold" : "font-normal";
        const fillType = isActive ? "currentColor" : "none"; // Solid jika aktif (opsional, tergantung icon)
        
        // Khusus Icon SVG, kita manipulasi 'fill' atau 'stroke'
        // Disini saya pakai stroke untuk inactive, dan fill currentColor untuk active biar beda
        let finalIcon = `<svg class="w-6 h-6" fill="${isActive ? 'currentColor' : 'none'}" stroke="currentColor" viewBox="0 0 24 24">${item.icon}</svg>`;
        
        // Kalau Kontak, iconnya beda style sedikit (optional adjustment)
        if(item.name === 'Kontak' && isActive) {
             finalIcon = `<svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm-.4 4.25l-7.07 4.42c-.32.2-.74.2-1.06 0L4.4 8.25c-.25-.16-.4-.43-.4-.72 0-.67.73-1.11 1.3-.72l6.7 4.19 6.7-4.19c.57-.39 1.3.05 1.3.72 0 .29-.15.56-.4.72z"></path></svg>`;
        }

        menuHTML += `
            <a href="${item.link}" class="flex flex-col items-center gap-1 ${colorClass} transition w-16">
                ${finalIcon}
                <span class="text-[10px] ${fontClass}">${item.name}</span>
            </a>
        `;
    });

    // Masukkan ke dalam Container Fixed Bottom
    navContainer.innerHTML = `
        <div class="fixed bottom-0 w-full bg-black border-t border-white/10 pb-safe pt-2 px-6 z-50">
            <div class="flex justify-between items-center h-16 max-w-md mx-auto">
                ${menuHTML}
            </div>
        </div>
    `;
});


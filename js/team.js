
/* =========================================
   OUR TEAM SECTION - DYNAMIC LOADING
   Handles rendering of member cards and filtering
   ========================================= */

document.addEventListener('DOMContentLoaded', () => {
    initTeamSection();
});

function initTeamSection() {
    const teamGrid = document.querySelector('.team-grid');
    const tabs = document.querySelectorAll('.team-tab-btn');

    if (!teamGrid || !tabs) return;

    // --- Member Data ---
    // Note: Roles and Links are placeholders as requested. 
    // You can update them easily in this array.

    // Club Members Lists
    const eceaMembers = [
        { name: "ABHIMANYU SINGH BHATI", img: "ABHIMANYU SINGH BHATI ECE.jpg" },
        { name: "ANUSHRI V", img: "ANUSHRI V ECE.jpg" },
        { name: "BALAJI S", img: "BALAJI S ECE.jpg" },
        { name: "HARINEE V T", img: "HARINEE V T ECE.jpg" },
        { name: "LAVANYA P", img: "LAVANYA P ECE.jpg" },
        { name: "MOHAMMED RAEEF", img: "MOHAMMED RAEEF ECE.jpeg" },
        { name: "N YAAZHINII", img: "N YAAZHINII ECE.jpg" },
        { name: "PRATHIBA S", img: "PRATHIBA S.png" },
        { name: "PREETHIKA R", img: "PREETHIKA R ECE.jpg" },
        { name: "SUDESH SHRIKANT PILLAI", img: "SUDESH SHRIKANT PILLAI ECE.jpg" },
        { name: "SURYA K", img: "SURYA K ECE.jpg" }
    ].map(m => ({ ...m, club: "ECEA", role: "Core Member", path: `assets/ECEA-MEMBERS/${m.img}` }));

    const ieteMembers = [
        { name: "A AADHITHYA NARAYANAN", img: "A AADHITHYA NARAYANAN ECE.jpg" },
        { name: "BAWADHARANI", img: "BAWADHARANI.jpg" },
        { name: "HARINI C", img: "HARINI C ECE.jpeg" },
        { name: "KARUNYA D", img: "KARUNYA D ECE.jpg" },
        { name: "MAHALAKSHMI L", img: "MAHALAKSHMI L ECE.jpg" },
        { name: "ROHITH KANNA S", img: "ROHITH KANNA S ECE.JPG" },
        { name: "ROOBUCK GANESHWARA RAO C", img: "Roobuck ganeshwara rao C.jpg" },
        { name: "SANJANA PRAVEEN KUMAR", img: "SANJANA PRAVEEN KUMAR ECE.jpg" },
        { name: "TEJASWI S", img: "TEJASWI S ECE.jpeg" },
        { name: "VISWANATHAN L", img: "VISWANATHAN L ECE.jpg" },
        { name: "YAAMINY S K", img: "YAAMINY S K ECE.JPG" }
    ].map(m => ({ ...m, club: "IETE", role: "Core Member", path: `assets/IETE-MEMBERS/${m.img}` }));

    const raceMembers = [
        { name: "ADARSH S", img: "ADARSH S.jpg" },
        { name: "ASWIN KUMAR K", img: "ASWIN KUMAR K.jpg" },
        { name: "B S AARTI", img: "B S AARTI ECE.jpg" },
        { name: "BALASARASWATHY B", img: "BALASARASWATHY B ECE.jpg" },
        { name: "LAKSHANA", img: "LAKSHANA ECE.jpg" },
        { name: "LOHITH ASHWA S", img: "LOHITH ASHWA S ECE.png" }, // Chose PNG
        { name: "MUHILAN S", img: "MUHILAN S ECE.jpg" },
        { name: "PREETHIKA R", img: "PREETHIKA R ECE.jpg" },
        { name: "RITHVIK R", img: "RITHVIK R ECE.jpg" },
        { name: "ROSHAN", img: "ROSHAN.JPG" },
        { name: "SANJAI P", img: "SANJAI P ECE.jpg" },
        { name: "SHRIRAM KUMAR V", img: "SHRIRAM KUMAR V ECE.jpg" },
        { name: "SRIVATSAN S P", img: "SRIVATSAN S P ECE.jpg" },
        { name: "SUDHAN S", img: "SUDHAN S ECE.png" },
        { name: "VINAYAGAMURTHI E", img: "VINAYAGAMURTHI E ECE.jpg" },
        { name: "VIKASH KRISHNAKUMAR", img: "vikash Krishnakumar.jpg" }
    ].map(m => ({ ...m, club: "RACE", role: "Core Member", path: `assets/RACE-MEMBERS/${m.img}` }));

    // Combine all members
    const allMembers = [...eceaMembers, ...ieteMembers, ...raceMembers];

    // --- Render Function ---
    function renderMembers(clubFilter) {
        // Clear grid
        teamGrid.innerHTML = '';

        let filteredMembers = allMembers;
        if (clubFilter !== 'ALL') {
            filteredMembers = allMembers.filter(m => m.club === clubFilter);
        }

        // Animate out (if we were doing complex transitions, but for now just clear/render)

        filteredMembers.forEach((member, index) => {
            const card = document.createElement('div');
            card.className = 'member-card';
            // Stagger animation delay
            card.style.animation = `fadeInUp 0.5s ease forwards ${index * 0.05}s`;
            card.style.opacity = '0'; // Start hidden for animation

            card.innerHTML = `
                <div class="member-card-corners"></div>
                <div class="member-img-box">
                    <img src="${member.path}" alt="${member.name}" class="member-img" loading="lazy">
                </div>
                <div class="member-info">
                    <h3 class="member-name">${member.name}</h3>
                    <div class="member-role">${member.role}</div>
                    <div class="member-socials">
                        <a href="#" class="social-link" title="LinkedIn">
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
                        </a>
                        <a href="#" class="social-link" title="GitHub">
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
                        </a>
                        <a href="#" class="social-link" title="Email">
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
                        </a>
                    </div>
                </div>
            `;
            teamGrid.appendChild(card);
        });
    }

    // --- Event Listeners ---
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // Remove active class from all
            tabs.forEach(t => t.classList.remove('active'));
            // Add to clicked
            tab.classList.add('active');

            // Filter
            const filter = tab.dataset.club;
            renderMembers(filter);
        });
    });

    // Add simple FadeInUp animation style dynamically if not in CSS
    const styleSheet = document.createElement("style");
    styleSheet.innerText = `
        @keyframes fadeInUp {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
        }
    `;
    document.head.appendChild(styleSheet);

    // Initial Render (Default to ECEA or First Tab)
    // Let's default to the first tab's data (ECEA)
    renderMembers('ECEA');
}

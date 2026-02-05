
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
        { name: "Mohammed Raeef", role: "President", img: "MOHAMMED RAEEF ECE.jpeg", linkedin: "https://www.linkedin.com/in/raeef-ibrahim-3b721125a/", email: "2022ec0449@svce.ac.in" },
        { name: "Harinee V T", role: "Vice President", img: "HARINEE V T ECE.jpg", linkedin: "https://www.linkedin.com/in/harineevt", github: "https://github.com/Harinee827", email: "harineevt27@gmail.com" },
        { name: "Balaji S", role: "Secretary", img: "BALAJI S ECE.jpg", linkedin: "https://www.linkedin.com/in/balaji-santhanam008/", github: "https://github.com/Balajisanthanam205", email: "balajisanthanam205@gmail.com" },
        { name: "Surya K", role: "Treasurer", img: "SURYA K ECE.jpg", linkedin: "www.linkedin.com/in/suryak23", github: "https://github.com/suryak26", email: "2023ec0546@svce.ac.in" },
        { name: "Anushri V", role: "Executive Member", img: "ANUSHRI V ECE.jpg", linkedin: "https://www.linkedin.com/in/anu-shri?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app", email: "anushri0705@gmail.com" },
        { name: "Preethika R", role: "Executive Member", img: "PREETHIKA R ECE.jpg", linkedin: "www.linkedin.com/in/preethika-radhakrishnan-269958336", email: "preethiradha13@gmail.com" },
        { name: "Sudesh Pillai", role: "Executive Member", img: "SUDESH SHRIKANT PILLAI ECE.jpg", linkedin: "https://www.linkedin.com/in/sudesh-pillai-9bbb16292/", email: "sudesh120305@gmail.com" },
        { name: "Lavanya P", role: "Executive Member", img: "LAVANYA P ECE.jpg", linkedin: "https://www.linkedin.com/in/lavanya-p-6745ab322/", github:"https://github.com/LavanyaGKP", email: "2023ec0234@svce.ac.in" },
        { name: "N. Yaazhinii", role: "Joint Secretary", img: "N YAAZHINII ECE.jpg", linkedin: "https://www.linkedin.com/in/yaazhinii-narayanan-89b954326?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app", email: "n.yaazhinii@gmail.com" },
        { name: "Abhimanyu Singh Bhati", role: "Joint Secretary", img: "ABHIMANYU SINGH BHATI ECE.jpg", linkedin: "https://www.linkedin.com/in/abhimanyu-singh-bhati-7255a0328?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app", email: "abhimanyubhati22@gmail.com" },
        { name: "Prathiba MSK", role: "Joint Secretary", img: "PRATHIBA S.png", linkedin: "https://www.linkedin.com/in/m-s-k-prathiba-608588329?utm_source=share_via&utm_content=profile&utm_medium=member_android", email: "2024ec0664@svce.ac.in" }
    ].map(m => ({ ...m, club: "ECEA", path: `assets/ECEA-MEMBERS/${m.img}` }));

    const ieteMembers = [
        { name: "Yaaminiy S K", role: "Chair Person", img: "YAAMINY S K ECE.JPG", linkedin: "linkedin.com/in/yaaminy-karthikeyan", email: "yaaminykarthik@gmail.com" },
        { name: "Roobuck Ganeshwara Rao C", role: "Vice Chair Person", img: "Roobuck ganeshwara rao C.jpg", linkedin: "https://www.linkedin.com/in/roobuck/", github: "https://github.com/ROOBUCK22", email: "roobuckrao2205@gmail.com" },
        { name: "Harini Chinnasamy", role: "Honorary Secretary", img: "HARINI C ECE.jpeg", linkedin: "https://www.linkedin.com/in/harini-chinnasamy-577209291/", github: "https://github.com/harini1208", email: "harinichinnasamy@gmail.com" },
        { name: "Bawadharini Sree R", role: "Honorary Treasurer", img: "BAWADHARANI.jpg", linkedin: "https://www.linkedin.com/in/bawadharani-sree-ramakrishnan-97a638218?lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_contact_details%3B0NRmV%2FcNQQ6cAOudo99G%2FA%3D%3D", github: "https://github.com/BawadharaniSree", email: "bawadharanisree@gmail.com" },
        { name: "Tejaswi S", role: "Executive Member", img: "TEJASWI S ECE.jpeg", linkedin: "https://www.linkedin.com/in/tejaswi-s-361876293/", email: "2023ec0576@svce.ac.in" },
        { name: "Rohith Kanna S", role: "Executive Member", img: "ROHITH KANNA S ECE.JPG", linkedin: "https://www.linkedin.com/in/rohith4510/", github: "https://github.com/Rohithkannas", email: "2023ec0574@svce.ac.in" },
        { name: "Karunya D", role: "Executive Member", img: "KARUNYA D ECE.jpg", linkedin: "https://www.linkedin.com/in/karunya-d-a96bb5357?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app", email: "2023ec0240@svce.ac.in" },
        { name: "Sanjana Praveen Kumar", role: "Executive Member", img: "SANJANA PRAVEEN KUMAR ECE.jpg", linkedin: "https://www.linkedin.com/in/sanjana-praveen-kumar-588b7a354?utm_source=share_via&utm_content=profile&utm_medium=member_android", email: "2023ec0531@svce.ac.in" },
        { name: "A Aadhithya Narayanan", role: "Joint Secretary", img: "A AADHITHYA NARAYANAN ECE.jpg", linkedin: "LinkedIn.com/in/aadhithyanarayanan/", github: "github.com/Axdhi.07", email: "aadhithya0106@gmail.com" },
        { name: "Mahalakshmi L", role: "Joint Secretary", img: "MAHALAKSHMI L ECE.jpg", linkedin: "https://www.linkedin.com/in/maha-lakshmi-l-756594329/", github: "https://github.com/Maha03-03", email: "2024ec0167@svce.ac.in" },
        { name: "Viswanathan L", role: "Joint Secretary", img: "VISWANATHAN L ECE.jpg", linkedin: "https://www.linkedin.com/in/viswanathan-l-159423384?utm_source=share_via&utm_content=profile&utm_medium=member_android", github: "https://github.com/viswa-007", email: "viswanathan.26217@gmail.com" }
    ].map(m => ({ ...m, club: "IETE", path: `assets/IETE-MEMBERS/${m.img}` }));

    const raceMembers = [
        { name: "Roshan M", role: "President", img: "ROSHAN.JPG", linkedin: "www.linkedin.com/in/roshan-m-711a95292", github: "https://github.com/roshanongithub", email: "2022ec0448@svce.ac.in" },
        { name: "Adarsh S", role: "Vice President", img: "ADARSH S.jpg", linkedin: "https://www.linkedin.com/in/adarsh-s-400909255/", email: "adarshsreeram2004@gmail.com" },
        { name: "Lakshanaa A M", role: "Secretary", img: "LAKSHANA ECE.jpg", linkedin: "linkedin.com/in/lakshanaa-a-m-499057330" },
        { name: "Balasaraswathy B", role: "Lead Mentor", img: "BALASARASWATHY B ECE.jpg", linkedin: "https://www.linkedin.com/in/balasaraswathy-balagurusamy-a53a58265", github: "https://github.com/Balasaraswathy27 ", email: "bbalasaraswathy00@gmail.com" },
        { name: "Aswin Kumar K", role: "Lead Mentor", img: "ASWIN KUMAR K.jpg", linkedin: "https://www.linkedin.com/in/aswin-kumar5824", email: "aswinkumark1975@gmail.com" },
        { name: "Vikash S K", role: "Lead Mentor", img: "vikash Krishnakumar.jpg", linkedin: "https://www.linkedin.com/in/vikash07/", github: "https://github.com/vikash-prog", email: "yeskvikash@gmail.com" },
        { name: "Lohith Ashwa S", role: "Mentor", img: "LOHITH ASHWA S ECE.png", linkedin: "https://www.linkedin.com/in/lohith-ashwa-s-480842277", github: "lohithashwa.me - (Portfolio)", email: "lohithashwa51@gmail.com" },
        { name: "Muhilan S", role: "Mentor", img: "MUHILAN S ECE.jpg", linkedin: "https://www.linkedin.com/in/muhilan-selvakumar-a294a2353?utm_source=share_via&utm_content=profile&utm_medium=member_android", github: "https://github.com/Muhilan30", email: "www.muhilan30@gmail.com" },
        { name: "Srivatsan S P", role: "Mentor", img: "SRIVATSAN S P ECE.jpg", linkedin: "https://www.linkedin.com/in/srivatsan-sp-849a592a5?utm_source=share_via&utm_content=profile&utm_medium=member_android", email: "2023ec0033@svce.ac.in" },
        { name: "Shriram Kumar V", role: "Mentor", img: "SHRIRAM KUMAR V ECE.jpg", linkedin: "https://www.linkedin.com/in/shriram-kumar-v-383b0228b/", email: "2023ec0881@svce.ac.in" },
        { name: "Vinayagamurthi E", role: "Mentor", img: "VINAYAGAMURTHI E ECE.jpg", linkedin: "www.linkedin.com/in/ vinayagamurthi1212", email: "vinayagamurthire@gmail.com" },
        { name: "Sudhan S", role: "Mentor", img: "SUDHAN S ECE.png", linkedin: "https://www.linkedin.com/in/sudhan18/", github: "https://github.com/sudhans18", email: "sudhan4843@gmail.com" },
        { name: "Rithvik R", role: "Mentor", img: "RITHVIK R ECE.jpg", linkedin: "https://www.linkedin.com/in/rithvik-r-008663292/", github: "https://github.com/WhiteDevil1716", email: "rithvikr86@gmail.com" },
        { name: "B S. Aarthi", role: "Joint Secretary", img: "B S AARTI ECE.jpg", linkedin: "https://www.linkedin.com/in/aarti-swaminathan-a55327375?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app", email: "2024ec0223@svce.ac.in" },
        { name: "Preethika R", role: "Joint Secretary", img: "PREETHIKA R ECE.jpg", linkedin: "https://www.linkedin.com/in/preethika-r-158285329?utm_source=share_via&utm_content=profile&utm_medium=member_android", email: "rpreethika0608@gmail.com" },
        { name: "Sanjai P", role: "Joint Secretary", img: "SANJAI P ECE.jpg", linkedin: "https://www.linkedin.com/in/sanjai-parthiban-57015337b?utm_source=share_via&utm_content=profile&utm_medium=member_android", email: "Indsanjai@gmail.com" }
    ].map(m => ({ ...m, club: "RACE", path: `assets/RACE-MEMBERS/${m.img}` }));

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
                        <a href="${member.linkedin && member.linkedin.match(/^http/i) ? member.linkedin : (member.linkedin ? 'https://' + member.linkedin : '#')}" class="social-link" title="LinkedIn" target="_blank" ${!member.linkedin ? 'style="pointer-events: none; opacity: 0.5;"' : ''}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
                        </a>
                        <a href="${member.github && member.github.match(/^http/i) ? member.github : (member.github ? 'https://' + member.github : '#')}" class="social-link" title="GitHub" target="_blank" ${!member.github ? 'style="pointer-events: none; opacity: 0.5;"' : ''}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
                        </a>
                        <a href="${member.email ? 'mailto:' + member.email : '#'}" class="social-link" title="Email" ${!member.email ? 'style="pointer-events: none; opacity: 0.5;"' : ''}>
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

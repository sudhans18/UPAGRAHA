# UPAGRAHA '26

Official website for the UPAGRAHA '26 symposium, organized by the Department of Electronics and Communication Engineering at SVCE, Chennai. This project is built using HTML, CSS, and JavaScript, featuring cinematic scroll animations and interactive elements.

## 🚀 Getting Started

Follow this detailed guide to set up the project locally on your machine.

### 📋 Prerequisites

Before you begin, ensure you have the following installed:

1.  **Git**: Version control system to clone the repository.
    *   [Download Git](https://git-scm.com/downloads)
2.  **Node.js**: JavaScript runtime (includes `npm`).
    *   [Download Node.js](https://nodejs.org/) (LTS version recommended)
3.  **Antigravity**: The AI-powered IDE used for this project.
    *   Ensure you have the Antigravity application installed and running.

### 🛠️ Installation & Setup

1.  **Clone the Repository**
    Open your terminal or command prompt (CMD/PowerShell on Windows, Terminal on Mac/Linux) and run the following command to download the code:
    ```bash
    git clone https://github.com/sudhans18/UPAGRAHA.git
    ```
    Then, navigate into the project directory:
    ```bash
    cd UPAGRAHA
    ```

2.  **Open in Antigravity**
    *   Launch the **Antigravity** application.
    *   Click on **Open Folder** (or File > Open).
    *   Navigate to the folder where you cloned the repository (`UPAGRAHA`) and select it.
    *   The project should now be loaded in the Antigravity editor.

3.  **Install Dependencies**
    The project uses `npm` to manage development dependencies (specifically a local server).
    *   Open the terminal within Antigravity (View > Terminal or `Ctrl+``).
    *   Run the following command:
    ```bash
    npm install
    ```
    This will install the packages listed in `package.json` (e.g., `serve`) into a `node_modules` folder.

### ▶️ Running the Project

To view the website locally, you need to run a local web server.

1.  In the terminal, run:
    ```bash
    npm start
    ```
    *Note: This command runs the `serve` utility as defined in `package.json`.*

2.  The terminal will show a local address, usually:
    *   `http://localhost:3000`

    Click the link or copy-paste it into your web browser to see the UPAGRAHA '26 website in action!

### 🛑 Stopping the Server
To stop the server, go to the terminal where it is running and press `Ctrl + C`.

## 📂 Project Structure

*   **`index.html`**: The main landing page of the website.
*   **`css/`**: usage-specific stylesheets (e.g., `events.css` for the events section).
*   **`js/`**: JavaScript logic for animations and interactivity (e.g., `hero.js`).
*   **`assets/`**: Contains images, frame sequences for animations, and other media.
*   **`events/`**: HTML files for individual event details or sub-sections.

## 🤝 Contributing

1.  Fork the project.
2.  Create your feature branch (`git checkout -b feature/AmazingFeature`).
3.  Commit your changes (`git commit -m 'Add some AmazingFeature'`).
4.  Push to the branch (`git push origin feature/AmazingFeature`).
5.  Open a Pull Request.

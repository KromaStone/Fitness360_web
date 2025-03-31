import { useContext } from "react";
import { ThemeContext } from "./ThemeProvider";
import { Select, SelectItem } from "@nextui-org/react";
import { color } from "framer-motion";


const ThemeToggle = () => {
    const { theme, resolvedTheme, setThemePreference } = useContext(ThemeContext);

    return (
        <div className="w-[124px]">
            <Select
                selectedKeys={[theme]}
                onChange={(e) => setThemePreference(e.target.value)}
                variant="faded"
            >
                <SelectItem
                    key="light"
                    value="light"
                    startContent={<svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24"><g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}><path strokeDasharray={36} strokeDashoffset={36} d="M12 7c2.76 0 5 2.24 5 5c0 2.76 -2.24 5 -5 5c-2.76 0 -5 -2.24 -5 -5c0 -2.76 2.24 -5 5 -5"><animate fill="freeze" attributeName="stroke-dashoffset" dur="0.5s" values="36;0"></animate></path><path strokeDasharray={2} strokeDashoffset={2} d="M12 19v1M19 12h1M12 5v-1M5 12h-1" opacity={0}><animate fill="freeze" attributeName="d" begin="0.6s" dur="0.2s" values="M12 19v1M19 12h1M12 5v-1M5 12h-1;M12 21v1M21 12h1M12 3v-1M3 12h-1"></animate><animate fill="freeze" attributeName="stroke-dashoffset" begin="0.6s" dur="0.2s" values="2;0"></animate><set fill="freeze" attributeName="opacity" begin="0.6s" to={1}></set><animateTransform attributeName="transform" dur="30s" repeatCount="indefinite" type="rotate" values="0 12 12;360 12 12"></animateTransform></path><path strokeDasharray={2} strokeDashoffset={2} d="M17 17l0.5 0.5M17 7l0.5 -0.5M7 7l-0.5 -0.5M7 17l-0.5 0.5" opacity={0}><animate fill="freeze" attributeName="d" begin="0.8s" dur="0.2s" values="M17 17l0.5 0.5M17 7l0.5 -0.5M7 7l-0.5 -0.5M7 17l-0.5 0.5;M18.5 18.5l0.5 0.5M18.5 5.5l0.5 -0.5M5.5 5.5l-0.5 -0.5M5.5 18.5l-0.5 0.5"></animate><animate fill="freeze" attributeName="stroke-dashoffset" begin="0.8s" dur="0.2s" values="2;0"></animate><set fill="freeze" attributeName="opacity" begin="0.8s" to={1}></set><animateTransform attributeName="transform" dur="30s" repeatCount="indefinite" type="rotate" values="0 12 12;360 12 12"></animateTransform></path></g></svg>}
                >
                    Light
                </SelectItem>
                <SelectItem
                    key="dark"
                    value="dark"
                    startContent={<svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24"><g fill="currentColor" fillOpacity={0}><path d="M15.22 6.03l2.53-1.94L14.56 4L13.5 1l-1.06 3l-3.19.09l2.53 1.94l-.91 3.06l2.63-1.81l2.63 1.81z"><animate id="lineMdMoonLoop0" fill="freeze" attributeName="fill-opacity" begin="0.7s;lineMdMoonLoop0.begin+6s" dur="0.4s" values="0;1"></animate><animate fill="freeze" attributeName="fill-opacity" begin="lineMdMoonLoop0.begin+2.2s" dur="0.4s" values="1;0"></animate></path><path d="M13.61 5.25L15.25 4l-2.06-.05L12.5 2l-.69 1.95L9.75 4l1.64 1.25l-.59 1.98l1.7-1.17l1.7 1.17z"><animate fill="freeze" attributeName="fill-opacity" begin="lineMdMoonLoop0.begin+3s" dur="0.4s" values="0;1"></animate><animate fill="freeze" attributeName="fill-opacity" begin="lineMdMoonLoop0.begin+5.2s" dur="0.4s" values="1;0"></animate></path><path d="M19.61 12.25L21.25 11l-2.06-.05L18.5 9l-.69 1.95l-2.06.05l1.64 1.25l-.59 1.98l1.7-1.17l1.7 1.17z"><animate fill="freeze" attributeName="fill-opacity" begin="lineMdMoonLoop0.begin+0.4s" dur="0.4s" values="0;1"></animate><animate fill="freeze" attributeName="fill-opacity" begin="lineMdMoonLoop0.begin+2.8s" dur="0.4s" values="1;0"></animate></path><path d="M20.828 9.731l1.876-1.439l-2.366-.067L19.552 6l-.786 2.225l-2.366.067l1.876 1.439L17.601 12l1.951-1.342L21.503 12z"><animate fill="freeze" attributeName="fill-opacity" begin="lineMdMoonLoop0.begin+3.4s" dur="0.4s" values="0;1"></animate><animate fill="freeze" attributeName="fill-opacity" begin="lineMdMoonLoop0.begin+5.6s" dur="0.4s" values="1;0"></animate></path></g><path fill="none" stroke="currentColor" strokeDasharray={56} strokeDashoffset={56} strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 6 C7 12.08 11.92 17 18 17 C18.53 17 19.05 16.96 19.56 16.89 C17.95 19.36 15.17 21 12 21 C7.03 21 3 16.97 3 12 C3 8.83 4.64 6.05 7.11 4.44 C7.04 4.95 7 5.47 7 6 Z"><animate fill="freeze" attributeName="stroke-dashoffset" dur="0.6s" values="56;0"></animate></path></svg>}
                >
                    Dark
                </SelectItem>
                <SelectItem
                    key="system"
                    value="system"
                    startContent={<svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24"><path fill="currentColor" d="M10 16h4v0h-4z"><animate fill="freeze" attributeName="d" begin="0.6s" dur="0.2s" values="M10 16h4v0h-4z;M10 16h4v6h-4z"></animate></path><g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}><path strokeDasharray={72} strokeDashoffset={72} d="M12 17h-10v-14h20v14Z"><animate fill="freeze" attributeName="stroke-dashoffset" dur="0.6s" values="72;0"></animate></path><path strokeDasharray={4} strokeDashoffset={4} d="M12 21h3M12 21h-3"><animate fill="freeze" attributeName="stroke-dashoffset" begin="0.8s" dur="0.2s" values="4;0"></animate></path></g></svg>}
                >
                    Device
                </SelectItem>
            </Select>
        </div >
    );
};

export default ThemeToggle;
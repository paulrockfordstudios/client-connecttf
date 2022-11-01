import { People, Person, Public, VisibilityOutlined, PeopleAlt, ArrowBack, ArrowForward, Category } from "@material-ui/icons";

// ------- Functions to get icons ------- //

// GET

// Visibility icon
export function visibilityIcon(visible, primary, secondary) {
    if(visible) {
        let icon;
            switch (visible) {
                case "Public":
                    icon = <Public className={primary}/>;
                    break;
                case "Friends":
                    icon = <People className={primary}/>;
                    break;
                case "Befrienders":
                    icon = <>
                            <People className={primary}/>
                            <ArrowBack className={secondary}/>
                           </>;
                    break;
                case "Befriending":
                    icon = <>
                            <People className={primary}/>
                            <ArrowForward className={secondary}/>
                           </>;
                    break;
                case "Unions":
                    icon = <>
                            <PeopleAlt className={primary}/>
                            <Public className={secondary}/>
                           </>;
                    break;
                case "Union Friends":
                    icon = <>
                            <PeopleAlt className={primary}/>
                            <People className={secondary}/>
                           </>;
                    break;
                case "Union Befrienders":
                    icon = <>
                            <PeopleAlt className={primary}/>
                            <ArrowBack className={secondary}/>
                           </>;
                    break;
                case "Unions Befriending":
                    icon = <>
                            <PeopleAlt className={primary}/>
                            <ArrowForward className={secondary}/>
                           </>;
                    break;
                case "Flames":
                    icon = <>
                            <Person className={primary}/>
                            <Public className={secondary}/>
                           </>;
                    break;
                case "Flame Friends":
                    icon = <>
                            <Person className={primary}/>
                            <People className={secondary}/>
                           </>;
                    break;
                case "Flame Befrienders":
                    icon = <>
                            <Person className={primary}/>
                            <ArrowBack className={secondary}/>
                           </>;
                    break;
                case "Flames Befriending":
                    icon = <>
                            <Person className={primary}/>
                            <ArrowForward className={secondary}/>
                           </>;
                    break;
                case "Custom":
                    icon = <Category className={primary}/>;
                    break;
                case "Only You":
                    icon = <VisibilityOutlined className={primary}/>;
                    break;
                default:
                    icon = <Public className={primary}/>;
        }
        return icon;
    }
};


// Energy icon
export function energyIcon(energy) {
    const BASE_URL = "/icons/flameEnergy/";
    if(energy) {
        let urlIcon = "";
        let icon = "";
        if(energy === "masculine") {
            icon = "masculine-flame.png";
        } else if(energy === "feminine") {
            icon = "feminine-flame.png";
        } else {
            icon = "";
        }
        icon === "" ? urlIcon = "" : urlIcon = BASE_URL + icon;
        return urlIcon;
    }
};

// share icon
export function shareIcon(share) {
    const BASE_URL = "/icons/share/";
    if(share) {
        let urlIcon = "";
        let icon;
            switch (share) {
                case "masculine":
                    icon = "masculine.png";
                    break;
                case "feminine":
                    icon = "feminine.png";
                    break;
                case "ruby":
                    icon = "ruby.png";
                    break;
                case "orange":
                    icon = "orange.png";
                    break;
                case "sun":
                    icon = "sun.png";
                    break;
                case "emerald":
                    icon = "emerald.png";
                    break;
                case "blue":
                    icon = "blue.png";
                    break;
                case "indigo":
                    icon = "indigo.png";
                    break;
                case "violet":
                    icon = "violet.png";
                    break;
                case "rainbow":
                    icon = "rainbow.png";
                    break;
                case "silver":
                    icon = "silver.png";
                    break;
                case "gold":
                    icon = "gold.png";
                    break;
                case "platinum":
                    icon = "platinum.png";
                    break;
                case "diamond":
                    icon = "diamond.png";
                    break;
                default:
                    icon = "gray.png";
        }
        icon === "" ? urlIcon = "" : urlIcon = BASE_URL + icon;
        return urlIcon;
    }
};

// Charge icon
export function chargeIcon(charge) {
    const BASE_URL = "/icons/tao-charge/";
    if(charge) {
        let urlIcon = "";
        let icon = "";
        if(charge === "yin") {
            icon = "yin.png";
        } else if(charge === "yang") {
            icon = "yang.png";
        } else {
            icon = "";
        }
        icon === "" ? urlIcon = "" : urlIcon = BASE_URL + icon;
        return urlIcon;
    }
};

// Sex icon
export function sexIcon(sex) {
    const BASE_URL = "/icons/sex-orientation/";
    if(sex) {
        let urlIcon = "";
        let icon;
            switch (sex) {
                case "male":
                    icon = "male.png";
                    break;
                case "female":
                    icon = "female.png";
                    break;
                case "bigender":
                    icon = "bigender.png";
                    break;
                case "transgender":
                    icon = "transgender.png";
                    break;
                case "transgender male":
                    icon = "transgender.png";
                    break;
                case "transgender female":
                    icon = "transgender.png";
                    break;
                default:
                    icon = "";
        }
        icon === "" ? urlIcon = "" : urlIcon = BASE_URL + icon;
        return urlIcon;
    }
};

// Compass icon
export function compassIcon(compass) {
    const BASE_URL = "/icons/compass/";
    if(compass) {
        let urlIcon = "";
        let icon;
            switch (compass) {
                case "northwest":
                    icon = "northwest.png";
                    break;
                case "north":
                    icon = "north.png";
                    break;
                case "northeast":
                    icon = "northeast.png";
                    break;
                case "east":
                    icon = "east.png";
                    break;
                case "southeast":
                    icon = "southeast.png";
                    break;
                case "south":
                    icon = "south.png";
                    break;
                case "southwest":
                    icon = "southwest.png";
                    break;
                case "west":
                    icon = "west.png";
                    break;
                default:
                    icon = "";
        }
        icon === "" ? urlIcon = "" : urlIcon = BASE_URL + icon;
        return urlIcon;
    }
};

// Orientation icon
export function orientationIcon(orientation, sex) {
    const BASE_URL = "/icons/sex-orientation/";
    let sexualOrientation = orientation + " " + sex;   
    let urlIcon = "";
    let icon;
        switch (sexualOrientation) {
            case "straight male":
                icon = "straight.png";
                break;
            case "straight female":
                icon = "straight.png";
                break;
            case "straight transgender male":
                icon = "straight.png";
                break;
            case "straight transgender female":
                icon = "straight.png";
                break;
            case "gay male":
                icon = "gay.png";
                break;
            case "gay transgender male":
                icon = "gay.png";
                break;
            case "lesbian female":
                icon = "lesbian.png";
                break;
            case "lesbian transgender female":
                icon = "lesbian.png";
                break;
            case "bi-sexual male":
                icon = "bi-male.png";
                break;
            case "bi-sexual transgender male":
                icon = "bi-male.png";
                break;
            case "bi-sexual female":
                icon = "bi-female.png";
                break;
            case "bi-sexual transgender female":
                icon = "bi-female.png";
                break;
            case "bi-curious male":
                icon = "bi-male.png";
                break;
            case "bi-curious transgender male":
                icon = "bi-male.png";
                break;
            case "bi-curious female":
                icon = "bi-female.png";
                break;
            case "bi-curious transgender female":
                icon = "bi-female.png";
                break;
            case "pan-sexual male":
                icon = "pan.png";
                break;
            case "pan-sexual female":
                icon = "pan.png";
                break;
            case "pan-sexual transender male":
                icon = "pan.png";
                break;
            case "pan-sexual transgender female":
                icon = "pan.png";
                break;
            case "pan-sexual transender":
                icon = "pan.png";
                break;
            default:
                icon = "";
        }
        icon === "" ? urlIcon = "" : urlIcon = BASE_URL + icon;
        return urlIcon;
};

// Spectrum Icon
export function spectrumIcon(spectrum) {
    const BASE_URL = "/icons/spectrum/";
    let urlIcon = "";
    let icon;
        switch (spectrum) {
            case "ruby":
                icon = "ruby.png";
                break;
            case "orange":
                icon = "orange.png";
                break;
            case "sun":
                icon = "sun.png";
                break;
            case "emerald":
                icon = "emerald.png";
                break;
            case "blue":
                icon = "blue.png";
                break;
            case "indigo":
                icon = "indigo.png";
                break;
            case "violet":
                icon = "violet.png";
                break;
            case "rainbow":
                icon = "rainbow.png";
                break;
            case "silver":
                icon = "silver.png";
                break;
            case "gold":
                icon = "gold.png";
                break;
            case "platinum":
                icon = "platinum.png";
                break;
            case "diamond":
                icon = "diamond.png";
                break;
            default:
                icon = "";
        }
        icon === "" ? urlIcon = "" : urlIcon = BASE_URL + icon;
        return urlIcon;
};

// Zodiac icon
export function zodiacIcon(sign) {
    const BASE_URL = "/icons/zodiac-signs/";
    if(sign) {
        let urlIcon = "";
        let icon;
            switch (sign) {
                case "Aquarius":
                    icon = "aquarius.png";
                    break;
                case "Pisces":
                    icon = "pisces.png";
                    break;
                case "Aries":
                    icon = "aries.png";
                    break;
                case "Taurus":
                    icon = "taurus.png";
                    break;
                case "Gemini":
                    icon = "gemini.png";
                    break;
                case "Cancer":
                    icon = "cancer.png";
                    break;
                case "Leo":
                    icon = "leo.png";
                    break;
                case "Virgo":
                    icon = "virgo.png";
                    break;
                case "Libra":
                    icon = "libra.png";
                    break;
                case "Scorpio":
                    icon = "scorpio.png";
                    break;
                case "Sagittarius":
                    icon = "sagittarius.png";
                    break;
                case "Capricorn":
                    icon = "capricorn.png";
                    break;
                default:
                    icon = "";
        }
        icon === "" ? urlIcon = "" : urlIcon = BASE_URL + icon;
        return urlIcon;
    }
};


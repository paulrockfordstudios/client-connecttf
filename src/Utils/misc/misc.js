import { Star, StarHalf, StarOutline } from "@material-ui/icons";

// Turns fetched data "user.hereFor" into a string w/ spaces.
export function stringHereFor(arr) {
    if(arr) {
        return arr.toString().split(",").join(", ");
    }
};

// Changes the color of the connection buttons to match the person's energy
export function btnsColorByEnergy(energy) {
    if(energy) {
        let btnColor = "";
        if(energy === "masculine") {
            btnColor = "btnsMasculine";
        } else if(energy === "feminine") {
            btnColor = "btnsFeminine";
        } else {
            btnColor = "btnsGrey";
        }
        return btnColor;
    }
};

// Changes the color of the connection buttons to match the union's spectrum
export function btnsColorBySpectrum(spectrum) {
    if(spectrum) {
        let btnColor = "";
        switch (spectrum) {
            case "ruby":
                btnColor = "btnsRuby";
                break;
            case "orange":
                btnColor = "btnsOrange";
                break;
            case "sun":
                btnColor = "btnsSun";
                break;
            case "emerald":
                btnColor = "btnsEmerald";
                break;
            case "blue":
                btnColor = "btnsBlue";
                break;
            case "indigo":
                btnColor = "btnsIndigo";
                break;
            case "violet":
                btnColor = "btnsViolet";
                break;
            case "rainbow":
                btnColor = "btnsRainbow";
                break;
            case "silver":
                btnColor = "btnsSilver";
                break;
            case "gold":
                btnColor = "btnsGold";
                break;
            case "platinum":
                btnColor = "btnsPlatinum";
                break;
            case "diamond":
                btnColor = "btnsDiamond";
                break;
            default:
                btnColor = "btnsGrey";
            }
        return btnColor;
    }
};

// Changes rating into a star field
export function getStarRating(rating) {
    let starRating = null;
    const starStyle = {
        verticalAlign: "Bottom",
        color: "goldenrod",
    };
    switch (rating) {
        case 0.5:
            starRating = (
                <>
                    <StarHalf style={starStyle}/>
                    <StarOutline style={starStyle}/>
                    <StarOutline style={starStyle}/>
                    <StarOutline style={starStyle}/>
                    <StarOutline style={starStyle}/>
                </>
            );
            break;
        case 1:
            starRating = (
                <>
                    <Star style={starStyle}/>
                    <StarOutline style={starStyle}/>
                    <StarOutline style={starStyle}/>
                    <StarOutline style={starStyle}/>
                    <StarOutline style={starStyle}/>
                </>
            );
            break;
        case 1.5:
            starRating = (
                <>
                    <Star style={starStyle}/>
                    <StarHalf style={starStyle}/>
                    <StarOutline style={starStyle}/>
                    <StarOutline style={starStyle}/>
                    <StarOutline style={starStyle}/>
                </>
            );
            break;
        case 2:
            starRating = (
                <>
                    <Star style={starStyle}/>
                    <Star style={starStyle}/>
                    <StarOutline style={starStyle}/>
                    <StarOutline style={starStyle}/>
                    <StarOutline style={starStyle}/>
                </>
            );
            break;
        case 2.5:
            starRating = (
                <>
                    <Star style={starStyle}/>
                    <Star style={starStyle}/>
                    <StarHalf style={starStyle}/>
                    <StarOutline style={starStyle}/>
                    <StarOutline style={starStyle}/>
                </>
            );
            break;
        case 3:
            starRating = (
                <>
                    <Star style={starStyle}/>
                    <Star style={starStyle}/>
                    <Star style={starStyle}/>
                    <StarOutline style={starStyle}/>
                    <StarOutline style={starStyle}/>
                </>
            );
            break;
        case 3.5:
            starRating = (
                <>
                    <Star style={starStyle}/>
                    <Star style={starStyle}/>
                    <Star style={starStyle}/>
                    <StarHalf style={starStyle}/>
                    <StarOutline style={starStyle}/>
                </>
            );
            break;
        case 4:
            starRating = (
                <>
                    <Star style={starStyle}/>
                    <Star style={starStyle}/>
                    <Star style={starStyle}/>
                    <Star style={starStyle}/>
                    <StarOutline style={starStyle}/>
                </>
            );
            break;
        case 4.5:
            starRating = (
                <>
                    <Star style={starStyle}/>
                    <Star style={starStyle}/>
                    <Star style={starStyle}/>
                    <Star style={starStyle}/>
                    <StarHalf style={starStyle}/>
                </>
            );
            break;
        case 5:
            starRating = (
                <>
                    <Star style={starStyle}/>
                    <Star style={starStyle}/>
                    <Star style={starStyle}/>
                    <Star style={starStyle}/>
                    <Star style={starStyle}/>
                </>
            );
            break;
        default:
            starRating = (
                <>
                    <StarOutline style={starStyle}/>
                    <StarOutline style={starStyle}/>
                    <StarOutline style={starStyle}/>
                    <StarOutline style={starStyle}/>
                    <StarOutline style={starStyle}/>
                </>
            );
    }
    return starRating;
};
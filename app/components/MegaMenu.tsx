import {faBars} from "@awesome.me/kit-2a2dc088e2/icons/classic/solid";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

const MegaMenu = () => {
    return <div>
        <div className={`shadow-lg absolute top-0`}>

        </div>
        <button className="size-8">
            <FontAwesomeIcon size="lg" color="black" icon={faBars} />
        </button>

    </div>
}

export default MegaMenu;

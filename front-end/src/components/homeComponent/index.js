import React, {Component, Fragment} from "react";
import HeaderComponent from "../headerComponent";
<<<<<<< Updated upstream
=======
import './style.css';
import GroupCardComponent from "../groupCardComponent/groupCardComponent";
import {PlusCircle} from "react-feather";
>>>>>>> Stashed changes

class HomeComponent extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return(
            <Fragment>
                <HeaderComponent />
<<<<<<< Updated upstream
=======
                <section className={"d-flex justify-content-center"}>
                    <div className={"d-flex homeContainerGroups flex-column"}>
                        <div className={"d-flex myGroupsTitle text-muted justify-content-between"}>
                            <div className={"groupsCount"}>
                                I miei gruppi (5)
                            </div>
                            <div className={"createGroupText"}>
                                Crea un gruppo
                                <PlusCircle style={{marginLeft: 5}} />
                            </div>
                        </div>

                        <div className={"d-flex flex-row flex-wrap groupsList mb-5"}>
                            {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((value, index) => (
                                <GroupCardComponent groupTitle={"Titolo del gruppo"} groupOwner={"Utente abc"} groupDescription={"Descrizione del gruppo"} key={index} />
                            ))}
                        </div>
                    </div>
                </section>
>>>>>>> Stashed changes
            </Fragment>
        )
    }
}

export default HomeComponent;

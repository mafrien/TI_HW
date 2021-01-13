import React, { Fragment, PureComponent } from 'react';
import { connect } from 'react-redux';
import { addShip, getShips } from '../../models/AppModel';
import {
    addShipAction,
    uploadShipsAction
} from '../../store/actions';
import './App.css';
import Ship from '../Ship/Ship';

class App extends PureComponent {
    state = {
        isInputShown: false,
        inputValue: ''
    };

    async componentDidMount() {
        const ships = await getShips();
        this.props.uploadShipsDispatch(ships);
    }

    showInput = () => this.setState({ isInputShown: true });

    onNameChange = ({ target: { value } }) => this.setState({ inputValue: value });

    onTypeChange = ({ target: { value } }) => this.setState({ typeValue: value });

    onKeyDown = async (event) => {
        if (event.key === 'Escape') {
            this.setState({ isInputShown: false, inputValue: '' });
            return;
        }

        if (event.key === 'Enter') {
            if (this.state.inputValue && this.state.typeValue) {
                const info = await addShip({ 
                    shipName: this.state.inputValue,
                    shipType: this.state.typeValue,
                    cruises: []
                });
                console.log(info);

                this.props.addShipDispatch(this.state.inputValue, this.state.typeValue);
            }
            this.setState({ isInputShown: false, inputValue: '', typeValue: '' });
        }
    };

    render() {
        const { isInputShown, inputValue } = this.state;
        const { ships } = this.props;
        return (
            <Fragment>
                <header id="main-header">
                    Administrator's personal account
                    <div id="author">
                        Islam Gasanov
                        <div className="avatar"></div>
                    </div>
                </header>
                <main id="tm-container">
                    { ships.map((ship, index) => (
                        <Ship
                            shipName={ ship.shipName }
                            shipType={ ship.shipType }
                            shipId={ index }
                            cruises={ ship.cruises }
                            key={`ship${index}`}
                        />
                    )) }
                    <div className="tm-tasklist">
                        { !isInputShown && (
                            <header 
                                className="tm-tasklist-header"
                                onClick={this.showInput}
                            >
                                Добавить корабль
                            </header> 
                        )}
                        { isInputShown && (
                            <div>
                                <input
                                    type="text"
                                    id="add-tasklist-input"
                                    placeholder="Новый корабль"
                                    value={inputValue}
                                    onChange={this.onNameChange}
                                    onKeyDown={this.onKeyDown}
                                />
                                <input
                                    type="radio"
                                    name="shipType"
                                    id="radiobutton"
                                    value="passenger"
                                    onChange={this.onTypeChange}
                                    onKeyDown={this.onKeyDown}
                                /> Пассажирский
                                <input
                                    type="radio"
                                    name="shipType"
                                    id="radiobutton"
                                    value="cargo"
                                    onChange={this.onTypeChange}
                                    onKeyDown={this.onKeyDown} 
                                /> Грузовой
                            </div>
                        )}
                    </div>
                </main>
            </Fragment>
        )   ;
    }
}

const mapStateToProps = ({ ships }) => ({ ships });

const mapDispatchToProps = dispatch => ({
    addShipDispatch: (shipName, shipType) => dispatch(addShipAction(shipName, shipType)),
    uploadShipsDispatch: (ships) => dispatch(uploadShipsAction(ships))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App);

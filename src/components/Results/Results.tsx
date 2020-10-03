import * as React from 'react';
import { Link } from 'react-router-dom';
import { getSessionStorage, KEYS_STORAGE } from '../../utils/storage';
import { URL_ROUTES } from '../App/routes';
import './Results.css';

export class Results extends React.Component {


    render() {
        console.log(getSessionStorage("PROFIT"));
        return (
            <div className="background-results">

                <div className="content-results">
                    <div >
                        <img className="handImg" src="https://hsto.org/webt/br/x-/f3/brx-f3_e1ajl1icshjfagettecy.png" alt="" />
                    </div>
                    <div className="total">
                        <h3 >
                            Total score:
                        </h3>
                        <h2>
                            {`$ ${getSessionStorage(KEYS_STORAGE.PROFIT)} earned`}
                        </h2>
                        <div className="btn-conteiner">
                        <Link className="again-btn" to={URL_ROUTES.START}>Try again</Link>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}



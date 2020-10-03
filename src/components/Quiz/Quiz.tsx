import * as React from 'react';
import { Link } from 'react-router-dom';
import { createTrue, IndentStyle, textSpanIsEmpty } from 'typescript';
import { setToSessionStorage, KEYS_STORAGE, getSessionStorage } from '../../utils/storage';
import {CLASSES,URL_QUIZ } from './constants';
import './Quiz.css';
interface AppState {
    quizData: Array<Object>;
    numberOfQuestion: Number;
    price: Array<Number>;
    mistakes: Number;
    letter: Array<String>;
    answerClass: Array<CLASSES>;
    showPriceList:Boolean
}
interface AppProps { }


export class Quiz extends React.Component<AppProps, AppState> {

    state = {
        quizData: [],
        numberOfQuestion: 0,
        price: [500, 1000, 2000, 4000, 8000, 16000, 32000, 64000, 125000, 250000, 500000, 1000000],
        letter: ["A", "B", "C", "D"],
        mistakes: 0,
        answerClass: [],
        showPriceList:false
    };

    getInitialAnswerClass(): Array<CLASSES> {
        let initialAnswerClass = [];
        this.state.quizData[this.state.numberOfQuestion].answers.forEach(el => {
            initialAnswerClass.push(CLASSES.INACTIVE);
        });
        return initialAnswerClass;
    }

    async setQuizDataToState(data) {
        await this.setState({
            quizData: data,
            numberOfQuestion: 0
        });
        this.setState({ answerClass: this.getInitialAnswerClass() });
    }
    async fetchQuizData() {
        const resp = await fetch(URL_QUIZ).then(resp => {
            return resp.json()
        }).then(resp => resp);
        return resp;
    }
    goToResult() {
        this.props["history"].push('/millionaire-quiz/results');
    }
    nextQuestion() {
        if (this.state.numberOfQuestion === this.state.quizData.length - 1)
            this.goToResult();
        else
            this.setState({ numberOfQuestion: this.state.numberOfQuestion + 1 });
    } 
    replaceClass(event, activeClass, newClass) {
        event.classList.remove(activeClass);
        event.classList.add(newClass);
    }
    getAnswerClassWithTrueAnswer(trueAnswer: IndentStyle) {
        const { numberOfQuestion, quizData } = this.state;
        let newAnswerClass = this.getInitialAnswerClass();
        newAnswerClass[trueAnswer] = CLASSES.CORRECT;

    }
    async trueAnswer(e) {
        const event = e.target;
        this.replaceClass(event, CLASSES.INACTIVE, CLASSES.SELECTED);
        const { numberOfQuestion, quizData } = this.state;
        const trueAnswer = quizData[numberOfQuestion].true;
        const newAnswerClass: any = this.getAnswerClassWithTrueAnswer(trueAnswer);
        setTimeout(() => {
            this.replaceClass(event, CLASSES.SELECTED, CLASSES.CORRECT);
            setTimeout(() => {
                const { mistakes, numberOfQuestion } = this.state;
                this.replaceClass(event, CLASSES.CORRECT, CLASSES.INACTIVE);
                console.log(event.classList);
                //запоминаем выиграную сумму
                setToSessionStorage(KEYS_STORAGE.PROFIT, this.state.price[numberOfQuestion - mistakes]);

                this.nextQuestion();
            }, 2000);
        }, 1000);

    }
    async falseAnswer(e) {
        const event = e.target;
        this.replaceClass(event, CLASSES.INACTIVE, CLASSES.SELECTED);
        setTimeout(() => {
            this.replaceClass(event, CLASSES.SELECTED, CLASSES.WRONG);

            setTimeout(() => {
                this.replaceClass(event, CLASSES.WRONG, CLASSES.INACTIVE);
                 this.setState({ mistakes: this.state.mistakes + 1 });
                if (this.state.mistakes === 3) {
                    setToSessionStorage(KEYS_STORAGE.PROFIT, 0);
                    this.goToResult();
                }
                else {
                    this.nextQuestion();
                }
            }, 2000);
        }, 1000);
    }
    
    checkActivePrice(price: Number) {
        let wonPrice = Number(getSessionStorage(KEYS_STORAGE.PROFIT));
        let classname = '';
        if (price <= wonPrice) {
            classname = "won";
        } else if (this.state.price[this.state.price.indexOf(Number(price)) - 1] === wonPrice ||
            price === this.state.price[0]) {
            classname = "active-price";
        }

        return classname;
    }

    renderQuestion() {
        if (this.state.quizData.length !== 0) {
            const { numberOfQuestion, quizData } = this.state;

            return (
                <div className="question-conteiner">
                    <h3>{quizData[numberOfQuestion].question}</h3>
                    <div className="answers">

                        {quizData[numberOfQuestion].answers.map((ans, i) => {
                            return (
                                <div className={`one-answer ${this.state.answerClass[i]}`} key={i} id={i} onClick={(e: any) => {
                                    return (ans.mark ? this.trueAnswer(e) : this.falseAnswer(e));
                                }}>
                                    <p className="letter-choice">{this.state.letter[i]}</p>
                                    <p>{ans.text}</p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            );
        }
    }
    renderPriceListForMob=()=>{
        console.log(this.state.showPriceList);
        const isShow = !this.state.showPriceList;
        this.setState({showPriceList:isShow});
    }
    async componentDidMount() {
        const quizData = await this.fetchQuizData();
        this.setQuizDataToState(quizData);
        setToSessionStorage(KEYS_STORAGE.PROFIT, 0);
    }
   
   
    render() {
        return (
            <div className="quiz-conteiner">
                <div  className="header-burger">
                    <i onClick={this.renderPriceListForMob} className="fas fa-bars hedden"></i>
                </div>
                {this.renderQuestion()}
                <div className={`price-list-conteiner ${this.state.showPriceList?"visible":"hidden"}`} >
                    <div className="price-list">
                        {this.state.price.map((price, i) => {
                            return (
                                <div className={`one-price ${this.checkActivePrice(price)}`} key={i * 100}>
                                    <p>
                                        {price}
                                    </p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        );
    }
}





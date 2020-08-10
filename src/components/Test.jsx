import React, {useState, useEffect, Fragment} from 'react';
import {animateScroll as scroll} from 'react-scroll';

import Endpoint from './Endpoint';
import * as questions from '../questions.json';

import './Test.css';

const PDD_QUESTIONS_COUNT = 20;
const PARTS_COUNT = 4;

const Test = () => {
    const [pddQuestions, setPddQuestions] = useState([]);
    const [currentTicket, setCurrentTicket] = useState(null);
    const [statistics, setStatistics] = useState({
        wrong: 0,
        correct: 0,
        finished: false,
    });

    useEffect(() => {
        const allPDDQuestions = questions.default;
        const visitedQuestions = new Map();
        const result = [];

        while (result.length !== PDD_QUESTIONS_COUNT) {
            const randomPartNumber = Math.floor(
                Math.random() * allPDDQuestions.length
            );
            if (!visitedQuestions.has(randomPartNumber))
                visitedQuestions.set(randomPartNumber, []);

            const randomQuestionCount =
                Math.floor(Math.random() * PARTS_COUNT) + 1;
            for (let i = 0; i < randomQuestionCount; i++) {
                if (
                    result.length === PDD_QUESTIONS_COUNT ||
                    visitedQuestions.get(randomPartNumber).length === 4
                )
                    break;
                const randomTicketNumber = Math.floor(
                    Math.random() *
                        allPDDQuestions[randomPartNumber].tickets.length
                );
                if (
                    visitedQuestions
                        .get(randomPartNumber)
                        .includes(randomTicketNumber)
                ) {
                    i--;
                    continue;
                }
                const ticket = {
                    ...allPDDQuestions[randomPartNumber].tickets[
                        randomTicketNumber
                    ],
                    showHint: false,
                    answerStatusMap: new Map(),
                    status: '',
                    number: result.length + 1,
                };

                result.push(ticket);
                visitedQuestions.get(randomPartNumber).push(randomTicketNumber);
            }
        }

        setPddQuestions(result);
        setCurrentTicket({...result[0]});
    }, []);

    const onNextTicketClick = () => {
        scroll.scrollTo(100);
        return setCurrentTicket({...pddQuestions[currentTicket.number]});
    };

    const onTicketClick = (e) =>
        setCurrentTicket({
            ...pddQuestions[+e.target.value],
        });

    const onAnswerClick = (e) => {
        const isAlreadyAnswered = currentTicket.status !== '';
        if (isAlreadyAnswered) return;

        const ticket = pddQuestions[currentTicket.number - 1];
        const clickedAnswerNumber = e.target.value;

        const status =
            clickedAnswerNumber === +currentTicket.correct
                ? 'correct'
                : 'wrong';

        ticket.answerStatusMap.set(clickedAnswerNumber, status);
        ticket.status = status;
        ticket.answerStatusMap.set(+currentTicket.correct, 'correct');
        setStatistics({...statistics, [status]: statistics[status] + 1});

        ticket.showHint = true;
        setCurrentTicket({
            ...ticket,
        });
        scroll.scrollToBottom();
    };

    const onEndpointClick = () => {
        if (statistics.wrong + statistics.correct !== 20) {
            alert('Вы ответили не на все вопросы.');
            return;
        }
        setStatistics({...statistics, finished: true});
    };

    const getButtonClasses = (ticket) => {
        const classes = ['btn', 'ticket', ticket.status];
        if (currentTicket.number === ticket.number) classes.push('active');

        return classes.join(' ');
    };

    const getAnswerClasses = (index) => {
        const classes = ['btn', 'answer'];
        if (currentTicket.answerStatusMap.get(index))
            classes.push(currentTicket.answerStatusMap.get(index));

        return classes.join(' ');
    };

    return statistics.finished ? (
        <Endpoint statistics={statistics} />
    ) : (
        currentTicket && (
            <Fragment>
                <div className="ticket-numbers">
                    {pddQuestions.map((ticket, i) => (
                        <button
                            key={i + 1}
                            className={getButtonClasses(ticket)}
                            onClick={onTicketClick}
                            value={i}
                        >
                            {ticket.number}
                        </button>
                    ))}
                </div>

                <div>
                    <img
                        className="ticket-image"
                        src={currentTicket.image}
                        alt={currentTicket.title}
                        title={currentTicket.title}
                    />
                    <div className="answers">
                        <h3 className="question">{currentTicket.title}</h3>
                        <ul>
                            {currentTicket.answers.map((answer, i) => (
                                <li
                                    className={getAnswerClasses(i + 1)}
                                    value={i + 1}
                                    key={i + 1}
                                    onClick={onAnswerClick}
                                >
                                    {answer}
                                </li>
                            ))}
                        </ul>
                        {pddQuestions.length !== currentTicket.number ? (
                            <button className="btn" onClick={onNextTicketClick}>
                                Далее
                            </button>
                        ) : (
                            <button className="btn" onClick={onEndpointClick}>
                                Закончить
                            </button>
                        )}
                        {currentTicket.showHint && (
                            <span className="ticket-hint">
                                {currentTicket.hint}
                            </span>
                        )}
                    </div>
                </div>
            </Fragment>
        )
    );
};

export default Test;

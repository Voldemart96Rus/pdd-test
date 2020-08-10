import React from 'react';

import './Endpoint.css';

const MIN_CORRECT_ANSWER_COUNT = 18;

const Endpoint = ({statistics: {correct, wrong}}) => {
    return (
        <div className="endpoint">
            <p className="correct-answer-count">
                Правильных ответов:{' '}
                <span className={correct === 0 ? '' : 'success'}>
                    {correct}
                </span>
            </p>
            <p className="wrong-answer-count">
                Неправильных ответов:{' '}
                <span className={wrong === 0 ? '' : 'fail'}>{wrong}</span>
            </p>
            {correct >= MIN_CORRECT_ANSWER_COUNT ? (
                <h3 className="success">Экзамен успешно сдан!</h3>
            ) : (
                <h3 className="fail">Экзамен не сдан!</h3>
            )}
            <a className="btn btn-primary" href="/">
                Начать заново
            </a>
        </div>
    );
};

export default Endpoint;

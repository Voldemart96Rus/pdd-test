import React, {useState, Fragment} from 'react';

import Test from './components/Test';
import Header from './components/Header';

import './App.css';

const App = () => {
    const [user, setUser] = useState({name: '', isSet: false});

    const onSubmit = (e) => {
        e.preventDefault();
        if (user.name.trim() !== '') setUser({...user, isSet: true});
    };

    return (
        <Fragment>
            <Header username={user.isSet ? user.name : ''} />
            <div className="container">
                <main className="main">
                    {user.isSet ? (
                        <Test />
                    ) : (
                        <Fragment>
                            <h1 className="test-title">
                                Категории «A», «B», «M» и подкатегории «A1»,
                                «B1»
                            </h1>
                            <p className="test-description">
                                В экзаменационном билете содержится 20 вопросов.
                                На каждый вопрос приводится от двух до пяти
                                вариантов ответов, один из которых правильный.
                            </p>
                            <form
                                id="start"
                                className="form"
                                onSubmit={onSubmit}
                            >
                                <label
                                    className="username-label"
                                    htmlFor="username-input"
                                >
                                    Введите имя
                                </label>
                                <div className="form-group">
                                    <input
                                        className="username-input"
                                        type="text"
                                        id="username-input"
                                        name="username"
                                        value={user.name}
                                        maxLength="20"
                                        onChange={(e) =>
                                            setUser({
                                                ...user,
                                                name: e.target.value,
                                            })
                                        }
                                        required
                                    />
                                    <button
                                        type="submit"
                                        className="btn btn-primary"
                                    >
                                        Пройти экзамен
                                    </button>
                                </div>
                            </form>
                        </Fragment>
                    )}
                </main>
            </div>
        </Fragment>
    );
};

export default App;

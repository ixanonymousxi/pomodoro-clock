'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Pomodoro = function (_React$Component) {
    _inherits(Pomodoro, _React$Component);

    function Pomodoro(props) {
        _classCallCheck(this, Pomodoro);

        var _this = _possibleConstructorReturn(this, (Pomodoro.__proto__ || Object.getPrototypeOf(Pomodoro)).call(this, props));

        _this.state = {
            breakLength: 5,
            sessionLength: 25,
            sessionBreak: "Session",
            minutes: 25,
            seconds: "00",
            play: false,
            timerID: 0
        };
        _this.incDec = _this.incDec.bind(_this);
        _this.leadZero = _this.leadZero.bind(_this);
        _this.startTimer = _this.startTimer.bind(_this);
        _this.timer = _this.timer.bind(_this);
        _this.switch = _this.switch.bind(_this);
        _this.reset = _this.reset.bind(_this);
        return _this;
    }

    //Display lead zeros to meet freecodecamp requirements, mm:ss instead of m:ss


    _createClass(Pomodoro, [{
        key: "leadZero",
        value: function leadZero(num) {
            return num < 10 ? "0" + num : num;
        }

        //Increase or Decrease the Break or Session values.

    }, {
        key: "incDec",
        value: function incDec(e) {
            switch (e.target.id) {
                case "break-increment":
                    if (this.state.breakLength < 60 && !this.state.play) {
                        this.setState({
                            breakLength: this.state.breakLength + 1
                        });
                    }
                    break;

                case "break-decrement":
                    if (this.state.breakLength > 1 && !this.state.play) {
                        this.setState({
                            breakLength: this.state.breakLength - 1
                        });
                    }
                    break;

                case "session-increment":
                    if (this.state.sessionLength < 60 && !this.state.play) {
                        this.setState({
                            sessionLength: this.state.sessionLength + 1,
                            minutes: this.leadZero(parseInt(this.state.sessionLength) + 1),
                            seconds: "00"
                        });
                    }
                    break;

                case "session-decrement":
                    if (this.state.sessionLength > 1 && !this.state.play) {
                        this.setState({
                            sessionLength: this.state.sessionLength - 1,
                            minutes: this.leadZero(parseInt(this.state.sessionLength) - 1),
                            seconds: "00"
                        });
                    }
                    break;
            }
        }

        //Switch session and break timers

    }, {
        key: "switch",
        value: function _switch() {
            if (this.state.sessionBreak === "Session") {
                this.setState({
                    sessionBreak: "Break",
                    minutes: this.leadZero(this.state.breakLength),
                    seconds: "00",
                    timerID: setInterval(this.timer, 1000)
                });
            } else {
                this.setState({
                    sessionBreak: "Session",
                    minutes: this.leadZero(this.state.sessionLength),
                    seconds: "00",
                    timerID: setInterval(this.timer, 1000)
                });
            }
        }
    }, {
        key: "startTimer",
        value: function startTimer() {
            this.setState({
                play: !this.state.play
            });

            if (!this.state.play) {
                this.setState({
                    timerID: setInterval(this.timer, 1000)
                });
            }
        }
    }, {
        key: "timer",
        value: function timer() {
            if (!this.state.play) {
                clearInterval(this.state.timerID);
            } else {
                if (parseInt(this.state.minutes) === 0 && parseInt(this.state.seconds) === 0) {
                    clearInterval(this.state.timerID);
                    document.getElementById("beep").play();
                    this.switch();
                } else if (parseInt(this.state.seconds) === 0) {
                    this.setState({
                        minutes: this.leadZero(parseInt(this.state.minutes) - 1),
                        seconds: 59
                    });
                } else {
                    this.setState({
                        seconds: this.leadZero(parseInt(this.state.seconds) - 1)
                    });
                }
            }
        }
    }, {
        key: "reset",
        value: function reset() {
            clearInterval(this.state.timerID);
            this.setState({
                breakLength: 5,
                sessionLength: 25,
                sessionBreak: "Session",
                minutes: 25,
                seconds: "00",
                play: false
            });
            document.getElementById("beep").pause();
            document.getElementById("beep").currentTime = 0;
        }
    }, {
        key: "render",
        value: function render() {
            var timerBG = {
                background: "transparent"
            };

            if (this.state.sessionBreak === "Session" && this.state.play) {
                timerBG.background = "lime";
                timerBG.color = "#1A2754";
            } else if (this.state.sessionBreak === "Break" && this.state.play) {
                timerBG.background = "red";
            }

            return React.createElement(
                "div",
                { id: "clock-wrapper" },
                React.createElement(
                    "div",
                    { "class": "row row-t" },
                    React.createElement(
                        "div",
                        { "class": "ses-break", id: "break" },
                        React.createElement(
                            "label",
                            { "class": "titles", id: "break-label" },
                            "Break Length"
                        ),
                        React.createElement(
                            "button",
                            null,
                            React.createElement("img", { id: "break-decrement", onClick: this.incDec, src: "images/arrow-bottom.png" })
                        ),
                        React.createElement(
                            "p",
                            { "class": "ses-break-num", id: "break-length" },
                            this.state.breakLength
                        ),
                        React.createElement(
                            "button",
                            null,
                            React.createElement("img", { id: "break-increment", onClick: this.incDec, src: "images/arrow-top.png" })
                        )
                    ),
                    React.createElement(
                        "div",
                        { "class": "ses-break", id: "session" },
                        React.createElement(
                            "label",
                            { "class": "titles", id: "session-label" },
                            "Session Length"
                        ),
                        React.createElement(
                            "button",
                            null,
                            React.createElement("img", { id: "session-decrement", onClick: this.incDec, src: "images/arrow-bottom.png" })
                        ),
                        React.createElement(
                            "p",
                            { "class": "ses-break-num", id: "session-length" },
                            this.state.sessionLength
                        ),
                        React.createElement(
                            "button",
                            null,
                            React.createElement("img", { id: "session-increment", onClick: this.incDec, src: "images/arrow-top.png" })
                        )
                    )
                ),
                React.createElement(
                    "div",
                    { "class": "row row-b" },
                    React.createElement(
                        "div",
                        { id: "timer", style: timerBG },
                        React.createElement(
                            "label",
                            { "class": "titles", id: "timer-label" },
                            this.state.sessionBreak
                        ),
                        React.createElement(
                            "div",
                            { id: "time-left" },
                            this.state.minutes,
                            ":",
                            this.state.seconds
                        )
                    ),
                    React.createElement(
                        "div",
                        { id: "buttons" },
                        React.createElement(
                            "button",
                            { id: "start_stop", onClick: this.startTimer },
                            "\u25BA\u275A\u275A"
                        ),
                        React.createElement(
                            "button",
                            { id: "reset", onClick: this.reset },
                            " ",
                            "\u21BB"
                        )
                    )
                ),
                React.createElement("audio", { id: "beep", src: "https://goo.gl/65cBl1" })
            );
        }
    }]);

    return Pomodoro;
}(React.Component);

var domContainer = document.querySelector('#clock');
ReactDOM.render(React.createElement(Pomodoro, null), domContainer);
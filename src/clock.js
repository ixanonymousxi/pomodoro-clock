'use strict';

class Pomodoro extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            breakLength: 5,
            sessionLength: 25,
            sessionBreak: "Session",
            minutes: 25,
            seconds: "00",
            play: false,
            timerID: 0
        };
        this.incDec = this.incDec.bind(this);
        this.leadZero = this.leadZero.bind(this);
        this.startTimer = this.startTimer.bind(this);
        this.timer = this.timer.bind(this);
        this.switch = this.switch.bind(this);
        this.reset = this.reset.bind(this);
    }

    //Display lead zeros to meet freecodecamp requirements, mm:ss instead of m:ss
    leadZero(num) {
        return num < 10 ? "0" + num : num;
    }

    //Increase or Decrease the Break or Session values.
    incDec(e) {
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
    switch() {
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

    startTimer() {
        this.setState({
            play: !this.state.play
        });

        if (!this.state.play) {
            this.setState({
                timerID: setInterval(this.timer, 1000)
            });
        }
    }

    timer() {
        if (!this.state.play) {
            clearInterval(this.state.timerID);
        } else {
            if (
                parseInt(this.state.minutes) === 0 &&
                parseInt(this.state.seconds) === 0
            ) {
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

    reset() {
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

    render() {
        let timerBG = {
            background: "transparent"
        };

        if (this.state.sessionBreak === "Session" && this.state.play) {
            timerBG.background = "lime";
            timerBG.color = "#1A2754";
        } else if (this.state.sessionBreak === "Break" && this.state.play) {
            timerBG.background = "red";
        }

        return (
            <div id="clock-wrapper">
                <div class="row row-t">
                    <div class="ses-break" id="break">
                        <label class="titles" id="break-label">Break Length</label>
                        <button>
                            <img id="break-decrement" onClick={this.incDec} src="images/arrow-bottom.png"></img>
                        </button>
                        <p class="ses-break-num" id="break-length">{this.state.breakLength}</p>
                        <button>
                            <img id="break-increment" onClick={this.incDec} src="images/arrow-top.png"></img>
                        </button>
                    </div>

                    <div class="ses-break" id="session">
                        <label class="titles" id="session-label">Session Length</label>
                        <button>
                            <img id="session-decrement" onClick={this.incDec} src="images/arrow-bottom.png"></img>
                        </button>
                        <p class="ses-break-num" id="session-length">{this.state.sessionLength}</p>
                        <button>
                            <img id="session-increment" onClick={this.incDec}src="images/arrow-top.png"></img>
                         </button>
                    </div>
                </div>

                <div class="row row-b">
                    <div id="timer" style={timerBG}>
                        <label class= "titles" id="timer-label">{this.state.sessionBreak}</label>
                        <div id="time-left">
                            {this.state.minutes}:{this.state.seconds}
                        </div>
                    </div>

                    <div id="buttons">
                        <button id="start_stop" onClick={this.startTimer}>
                            &#9658;&#10074;&#10074;
                        </button>
                        <button id="reset" onClick={this.reset}>
                            {" "}
                            &#8635;
                        </button>
                    </div>
                </div>

                <audio id="beep" src="https://goo.gl/65cBl1"></audio>
            </div>
        );
    }
}

let domContainer = document.querySelector('#clock');
ReactDOM.render(<Pomodoro />, domContainer);
import React, {Component} from 'react'
import Categories from '../Categories'
import ListItems from '../ListItems'

class Main extends Component {
  constructor(props) {
    super(props)
    const {tabsList, imagesList} = props
    this.state = {
      score: 0,
      tabsList: tabsList,
      activeId: tabsList[0].tabId,
      imagesList: imagesList,
      originalList: imagesList,
      timer: 60,
      isGameOn: true,
      findImage: imagesList[0].imageUrl,
    }
  }

  

  changeList = tabId => {
    const {originalList} = this.state
    const filteredList = originalList.filter(item => item.category === tabId)
    this.setState({imagesList: filteredList, activeId: tabId})
  }

  answertumb = imageUrl => {
    const {findImage, timer, originalList} = this.state
    if (findImage === imageUrl && timer > 0) {
      this.setState(prevState => ({
        score: prevState.score + 1,
        findImage:
          originalList[Math.floor(Math.random() * originalList.length)]
            .imageUrl,
      }))
    } else {
      clearInterval(this.timer)
      this.setState({isGameOn: false})
    }
  }

  playAgain = () => {
    const {tabsList, originalList} = this.state
    this.setState(       {
        score: 0,
        timer: 60,
        isGameOn: true,
        activeId: tabsList[0].tabId,
        findImage:
          originalList[Math.floor(Math.random() * originalList.length)]
            .imageUrl,
      }
    )
  }

  render() {
    const {imagesList, tabsList, score, timer, findImage, activeId, isGameOn} =
      this.state
    const imagesList2 = imagesList.filter(each => each.category === activeId)

    this.timer = setInterval(() => {
      const {originalList} = this.state
      this.setState(
        prevState => ({
          timer: prevState.timer > 0 ? prevState.timer - 1 : 0,
          isGameOn: prevState.timer > 0,
        }),

        () => {
          if (this.state.timer === 0) {
            clearInterval(this.timer)
          }
        },
      )
    }, 1000)


    return (
      <div>
        <ul>
          <img
            src="https://assets.ccbp.in/frontend/react-js/match-game-website-logo.png"
            alt="website logo"
          />
          <div>
            <li>
              <p>Score:{score > 0 ? score : '0'}</p>
            </li>
            <li>
              <div>
                <li>
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/match-game-timer-img.png"
                    alt="timer"
                  />
                </li>{' '}
                <li>
                  <p>
                    {timer < 10
                      ? `0${timer}`
                      : timer === 60
                      ? `${timer} secs`
                      : timer}
                  </p>
                </li>
              </div>
            </li>
          </div>
        </ul>
        {isGameOn ? (
          <div>
            <img src={findImage} alt="match" />
            <ul>
              {tabsList.map(each => (
                <Categories
                  each={each}
                  key={each.tabId}
                  isActive={activeId === each.id}
                  changeList={this.changeList}
                />
              ))}
            </ul>
            <ul>
              {imagesList2.map(each => (
                <ListItems
                  each={each}
                  key={each.id}
                  answertumb={this.answertumb}
                />
              ))}
            </ul>
          </div>
        ) : (
          <div>
            <img
              src="https://assets.ccbp.in/frontend/react-js/match-game-trophy.png"
              alt="trophy"
            />
            <p>YOUR SCORE</p>
            <p>{score}</p>
            <button type="button" onClick={this.playAgain}>
              <img
                src="https://assets.ccbp.in/frontend/react-js/match-game-play-again-img.png"
                alt="reset"
              />
              PLAY AGAIN
            </button>
          </div>
        )}
      </div>
    )
  }
}
export default Main

import React from "react";
import apple from "./img/apple.png";
import ball from "./img/ball.png";
import balloon from "./img/balloon.png";
import box from "./img/box.png";
import bread from "./img/bread.png";
import circle from "./img/circle.png";
import fish from "./img/fish.png";
import flag from "./img/flag.png";
import flower from "./img/flower.png";
import flower2 from "./img/flower-2.png";
import heart from "./img/heart.png";
import house from "./img/house.png";
import kettle from "./img/kettle.png";
import leaf from "./img/leaf.png";
import letter from "./img/letter.png";
import mask from "./img/mask.png";
import moon from "./img/moon.png";
import mushroom from "./img/mushroom.png";
import pear from "./img/pear.png";
import pencil from "./img/pencil.png";
import snail from "./img/snail.png";
import star from "./img/star.png";
import sun from "./img/sun.png";
import tree from "./img/tree.png";
import triangle from "./img/triangle.png";

import chase from "./img/badges/chase.png";
import marshall from "./img/badges/marshall.png";
import rocky from "./img/badges/rocky.png";
import skye from "./img/badges/skye.png";
import zuma from "./img/badges/zuma.png";
import rubble from "./img/badges/rubble.png";

import successAudio from "./sound/success.mp3";
import failedAudio from "./sound/failed.mp3";
import "./App.css";
import Fireworks from "@fireworks-js/react";
import Button from "react-bootstrap/Button";
import { Col, Container, Row } from 'react-bootstrap'

const SIZE = 25;

const IMAGES = [apple, ball, balloon, box, bread,
	circle, fish, flag, flower, flower2,
	heart, house, kettle, leaf, letter,
	mask, moon, mushroom, pear, pencil,
	snail, star, sun, tree, triangle
];


class GameState {
	static NoGame = new GameState('No Game');
	static NewGame = new GameState('New Game');
	static Guessing = new GameState('Guessing');
	static WonGame = new GameState('Won Game');
	static LostGame = new GameState('Lost Game');

	constructor(name) {
		this.name = name;
	}
	toString() {
		return this.name;
	}
}

class App extends React.Component {

	constructor (props) {
		super(props);

		this.state = {
			elements: [],
			selectedElements: [],
			level: 0,
			gameState: GameState.NoGame
		};

		this.success = new Audio(successAudio);
		this.failed = new Audio(failedAudio);
	}

	newGame () {
		let elements = [[...IMAGES][Math.floor(Math.random() * SIZE)]];
		this.setState({
			elements: elements,
			selectedElements: [],
			level: 0,
			gameState: GameState.NewGame
		});
	}

	nextGame () {
		let level = this.state.level;
		if (level >= 25) {
			level = 0;
		}
		let elements = this.shuffle([...IMAGES]).slice(SIZE - level - 1);

		this.setState({
			elements: elements,
			selectedElements: [],
			level: level,
			gameState: GameState.NewGame
		});
	}

	onRemember() {
		this.setState({
			gameState: GameState.Guessing
		});
	}

	onDone() {
		let isWon = true;
		if (this.state.selectedElements.length !== this.state.elements.length) {
			isWon = false;
		}
		for (let i = 0; i < this.state.selectedElements.length; i++) {
			if (this.state.selectedElements[i] !== this.state.elements[i]) {
				isWon = false;
				break;
			}
		}

		let level = this.state.level + 1;
		this.setState({
			gameState: isWon?GameState.WonGame:GameState.LostGame,
			level: level
		});

		if (isWon) {
			this.success.play();
		} else {
			this.failed.play();
		}
	}

	onSelected(element) {
		let selectedElements = this.state.selectedElements;
		selectedElements.push(element);
		this.setState({
			selectedElements: selectedElements,
		});
	}

	onRemove(index) {
		let selectedElements = [...this.state.selectedElements];
		selectedElements.splice(index, 1);
		console.log(index, selectedElements);
		this.setState({
			selectedElements: selectedElements,
		});
	}

	componentDidMount () {
		this.newGame()
	}

	shuffle (array) {
		let currentIndex = array.length, randomIndex;

		while (currentIndex !== 0) {

			// Pick a remaining element.
			randomIndex = Math.floor(Math.random() * currentIndex);
			currentIndex--;

			// And swap it with the current element.
			[array[currentIndex], array[randomIndex]] = [
				array[randomIndex], array[currentIndex]];
		}

		return array;
	}

	render () {
		return (
			<React.Fragment>
				<Container className={"d-flex flex-row mx-auto"} style={{ maxWidth: "500px"}}>
					<Row className={"row-cols-6"} style={{height:"100px"}}>
						<Col className={`px-1 my-auto ${(this.state.level > 0?"d-block":"d-none")}`}>
							<img
								src={skye}
								style={{
									width: "100%"
								}}/>
						</Col>
						<Col className={`px-1 my-auto ${(this.state.level > 1?"d-block":"d-none")}`}>
							<img
									src={zuma}
									style={{
										width: "100%"
									}}/>
						</Col>
						<Col className={`px-1 my-auto ${(this.state.level > 2?"d-block":"d-none")}`}>
							<img
									src={rocky}
									style={{
										width: "100%"
									}}/>
						</Col>
						<Col className={`px-1 my-auto ${(this.state.level > 3?"d-block":"d-none")}`}>
							<img
									src={rubble}
									style={{
										width: "100%"
									}}/>
						</Col>
						<Col className={`px-1 my-auto ${(this.state.level > 4?"d-block":"d-none")}`}>
							<img
									src={marshall}
									style={{
										width: "100%"
									}}/>
						</Col>
						<Col className={`px-1 my-auto ${(this.state.level > 5?"d-block":"d-none")}`}>
							<img
									src={chase}
									style={{
										width: "100%"
									}}/>
						</Col>
					</Row>
				</Container>
				<Container fluid={"true"} className={"d-flex flex-row mx-auto my-0"} style={{ maxWidth: "500px"}}>
					<Row className={"row-cols-5"}>
						{this.state.elements.map((item, key) => {
							return (
								<Col key={key} className={"m-0 p-0"} style={{minWidth: "100px", minHeight: "100px"}}>
									<div className={`m-1 p-0 
									${( this.state.gameState === GameState.LostGame && this.state.selectedElements[key] !== item )?" wrong-selection ":" memory-area "}
									${( this.state.gameState === GameState.WonGame )?" correct-selection":" "}
									`} style={{minWidth: "95px", minHeight: "95px"}}>
										{(this.state.selectedElements.length > key)?
												<img
														src={this.state.selectedElements[key]}
														onClick={this.onRemove.bind(this, key)}
														className={`${( this.state.gameState !== GameState.Guessing && this.state.gameState !== GameState.LostGame )?"memory-area-hidden":""}`}
														style={{
															width: "90px", height: "90px"
														}}
												/>
												:
												<React.Fragment />
										}
										<img
											src={item}
											className={`${( this.state.gameState === GameState.Guessing )?"memory-area-hidden":""}`}
											style={{
												width: "90px", height: "90px"
											}}
										/>
									</div>
								</Col>
							);
						})}
					</Row>
				</Container>
				<Container>
					<Row>
						<Col className={"p-2 mx-auto text-center"}>
							{(this.state.gameState === GameState.NewGame) ? (

								<Button variant={"primary"} onClick={this.onRemember.bind(this)}>
									Запомних
								</Button>

							) : (this.state.gameState === GameState.Guessing) ? (

								<Button variant={"success"} onClick={this.onDone.bind(this)}>
									Готов съм
								</Button>
							) : (this.state.gameState === GameState.WonGame) ? (

								<Button variant={"success"} onClick={this.nextGame.bind(this)}>
									Следваща игра
								</Button>
							) : (this.state.gameState === GameState.LostGame) ? (

								<Button variant={"success"} onClick={this.newGame.bind(this)}>
									Нова игра
								</Button>
							) :
								<React.Fragment/>
							}
						</Col>
					</Row>
				</Container>

				<Container fluid={"true"} className={`d-flex flex-row mx-auto my-0 ${(this.state.gameState === GameState.Guessing)?"samples-area-shown":"samples-area-hidden"}`} style={{ maxWidth: "500px" }}>
					<Row className={"row-cols-5"}>
						{IMAGES.map((item, key) => {
							return (
								<Col key={key} className={"p-2"} onClick={this.onSelected.bind(this, item)}>
									<img
										src={item}
										className={"sample-img"}
										style={{
											width: "100%",
											height: "100%"
										}}
									/>
								</Col>
							);
						})}
					</Row>
				</Container>

				{(this.state.gameState === GameState.WonGame && this.state.level >= 2) ? (
					<Fireworks
						options={{
							rocketsPoint: {
								min: 0,
								max: 100
							}
						}}
						style={{
							top: 0,
							left: 0,
							width: "100%",
							height: "100%",
							position: "fixed",
							zIndex: "-1",
							background: "#000"
						}}
					/>
				) : (
						<React.Fragment/>
				)}
			</React.Fragment>
		);
	}
}

export default App;

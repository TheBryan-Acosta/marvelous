import React, { useState, useEffect } from "react";
import axios from "axios";

// API Call through URL params
const SingleHero = () => {
	const [character, setCharacter] = useState([]);
	const queryParams = new URLSearchParams(window.location.search);
	const id = queryParams.get("id");
	// declaring variables needed for an API call as per Marvel documentation
	const md5 = require("md5");
	const privateKey = "c9e3d0742ac2221695971bb908881f232f6f4a61";
	const publicKey = "1f3466c186b0df273e3fc7f5e5e11ebc";
	const ts = new Date().getTime();
	const stringToHash = ts + privateKey + publicKey;
	const token = md5(stringToHash);
	const BASE_URL =
		"https://gateway.marvel.com:443/v1/public/characters?id=" + id;
	const testUrl =
		BASE_URL + "&ts=" + ts + "&apikey=" + publicKey + "&hash=" + token;
	//making API call using axios
	console.log(testUrl);
	useEffect(() => {
		axios.get(`${testUrl}`).then((res) => {
			console.log(res);
			const chardata = res.data.data.results[0];
			setCharacter(chardata);
		});
	}, []);
	console.log(character.name);
	const { name } = character;
	return <div>{name}</div>;
};

export default SingleHero;

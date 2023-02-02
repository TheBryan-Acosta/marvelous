import React from "react";
import { useQuery } from "@apollo/client";
import { QUERY_HERO } from "../utils/queries";
import CommentForm from "../components/CommentForm";
import Auth from "../utils/auth";

// Manual switch between Heroes via INDEX NUMBER [ 1, 2, 3, 4, 5 ]
const i = 4;
const Spotlight = (prop) => {
	console.log(i);
	console.log(QUERY_HERO);
	// use useQuery hook to make query request
	let { loading, data } = useQuery(QUERY_HERO, { variables: { index: i } });
	// const { loading, data } = useQuery(QUERY_HERO, );
	console.log(data);
	data = {
		hero: {
			_id: "621ff0c2154d6faab0a90de1",
			index: 4,
			name: "Dr. Strange",
			bio: "Once a highly successful, yet notably egotistical, surgeon, Doctor Stephen Strange endured a terrible accident that led him to evolve in ways he could have never foreseen.",
			trivia: "Did you know he needs poisonous food to survive?",
			image:
				"https://marvelous-project-3.s3.us-east-2.amazonaws.com/doctor-strange.jpg",
			comments: [
				{
					_id: "621ff34fa78c6d8fd2b36a12",
					commentText: "Test",
					createdAt: "Mar 2nd, 2022 at 4:44 pm",
					username: "thebryan-acosta",
					likeCount: null,
				},
				{
					_id: "621ff8661c030f6310a3eca7",
					commentText: "Test",
					createdAt: "Mar 2nd, 2022 at 5:06 pm",
					username: "thebryan-acosta",
					likeCount: null,
				},
				{
					_id: "62200d60298e4e9ffd462321",
					commentText: "yo",
					createdAt: "Mar 2nd, 2022 at 6:35 pm",
					username: "thebryan-acosta",
					likeCount: null,
				},
			],
		},
	};

	console.log("51");
	console.log(data);

	const { hero } = data || {};

	console.log(hero);

	if (loading) {
		return <div>Loading...</div>;
	}

	return (
		<div>
			<div className="d-flex spotlight-container ">
				<div className="col-12 col-md-6 spotlight-left-container text-center">
					<h3 className="spotlight-title">SPOTLIGHT HERO</h3>
					<h1 className="spotlight-name">{hero.name}</h1>
					<div className="mb-5 d-flex">
						<div className="bio-container card text-white bg-dark p-2 col">
							<h2 className="bio-title card-header page-title">Bio</h2>
							<p className="bio-text">{hero.bio}</p>
						</div>
						<div className="trivia-container card text-white bg-dark p-2 col">
							<div className="hero-trivia">
								<h2 className="card-header page-title">Trivia</h2>
								<p>{hero.trivia}</p>
							</div>
						</div>
					</div>
					{Auth.loggedIn() ? <CommentForm hero={hero} /> : <p></p>}
					<div className="comment-container ">
						{hero.comments &&
							hero.comments.map((comment) => (
								<div key={comment._id} className="card mt-3 text-white bg-dark">
									<p className="card-header">
										<span style={{ color: "red" }}>{comment.username}</span>{" "}
										commented on {comment.createdAt}
									</p>
									<div className="card-body">
										<p>{comment.commentText}</p>
									</div>
								</div>
							))}
					</div>
				</div>
				<div className="col">
					<img src={hero.image} alt={hero.name} className="card-img-top" />
				</div>
			</div>
		</div>
	);
};

export default Spotlight;

const faker = require("faker");
//import { PrismaClient } from "@prisma/client";
const { PrismaClient } = require("@prisma/client");
const { connect } = require("http2");
const seedingClient = new PrismaClient();

const specialtiesList = [
	"Anxiety",
	"Depression",
	"Addiction",
	"ADHD",
	"Anger management",
	"Bereavement",
	"Bullying",
	"Cancer",
	"Child related issues",
	"Depression",
	"Discrimination",
	"Drug addiction",
	"Panic attacks",
	"Postnatal depression",
	"Relationship problems",
	"Separation and divorce",
	"Stress",
	"Trauma",
];

const languagesList = [
	"English",
	"Spanish",
	"French",
	"Italian",
	"Russian",
	"Portuguese",
	"German",
	"Korean",
];
const hourlyRates = [40, 50, 60, 70, 80];
const numberOfUsers = 5;
const numberOfCounsellors = 5;

function randomNumberGenerator(min, max) {
	return Math.floor(Math.random() * (max - min + 1) + min);
}
function generateUserMessagesAndAppointments(user_ID, counsellor_ID) {
	let messages = [];

	for (const number of new Array(5)) {
		messages.push({
			user_ID,
			counsellor_ID,
			date: faker.date.recent(),
			content: faker.lorem.sentence(),
		});
	}

	const reviews = {
		date: faker.date.recent(),
		content: faker.lorem.paragraph(),
		user_ID,
		counsellor_ID,
	};

	const appointments = {
		user_ID,
		counsellor_ID,
		date: faker.date.soon(),
		time: faker.time.recent(),
	};

	return { messages, appointments, reviews };
}
function generateUser(user_ID) {
	const firstName = faker.name.firstName();
	const lastName = faker.name.lastName();
	const avatar = faker.image.avatar();
	const username =
		firstName + faker.datatype.number() + faker.datatype.number();
	const password = faker.internet.password();
	const counsellor_ID = randomNumberGenerator(1, 20);

	const { messages, appointments, reviews } =
		generateUserMessagesAndAppointments(user_ID, counsellor_ID);

	return {
		firstName,
		lastName,
		avatar,
		username: username,
		password,
		counsellor_ID,
		// messages,
		// appointments,
		// reviews,
	};
}
function generateCounsellor() {
	const firstName = faker.name.firstName();
	const lastName = faker.name.lastName();
	const avatar = faker.image.avatar();
	const about = faker.lorem.paragraph();
	const licensing = faker.lorem.words();
	const yearsExperience = randomNumberGenerator(3, 20);
	const gender = "male";
	let specialties = [];
	for (const number of new Array(5)) {
		const randomNumber = randomNumberGenerator(0, 18);
		specialties.push(specialtiesList[randomNumber]);
	}
	const hourlyRate = hourlyRates[randomNumberGenerator(0, 4)];

	return {
		firstName,
		lastName,
		avatar,
		about,
		licensing,
		yearsExperience,
		gender,
		specialties,
		hourlyRate,
	};
}
function generateCouncillorAppointments() {
	let appointments = [];
	for (let i = 1; i <= numberOfCounsellors; i++) {
		appointments.push({
			councillorId: i,
			dateTime: faker.date.soon(),
			user_ID: null,
			booked: false,
		});
	}
	return appointments;
}
function generateFAQs() {
	let FAQs = [];
	for (let i = 0; i < 10; i++) {
		FAQs.push({
			question: faker.lorem.sentence() + "?",
			answer: faker.lorem.paragraph(),
		});
	}
	return FAQs;
}

function generateLanguages() {
	return null;
}
function generateReview() {
	// date
	// content
	// user_ID
	// counsellor_ID

	const date = faker.date.recent();
	const content = faker.lorem.paragraph();

	return {
		date,
		content,
	};
}

async function main() {
	//   // GENERATE£ FAQs
	//   let FAQs = generateFAQs();
	//   for (const FAQ of FAQs) {
	//     await seedingClient.faq.create({
	//       data: {
	//         question: FAQ.question,
	//         answer: FAQ.answer,
	//       },
	//     });
	//   }

	//   // //GENERATE SPECIALTIES/ SERVICES
	//   let createdSpecialties = [];
	//   for (const specialty of specialtiesList) {
	//     let createdSpecialty = await seedingClient.service.create({
	//       data: { name: specialty },
	//     });
	//     createdSpecialties.push(createdSpecialty);
	//   }

	//   // GENERATE LANGUAGES
	//   let createdLanguages = [];
	//   for (const language of languagesList) {
	//     const createdLanguage = await seedingClient.language.create({
	//       data: {
	//         language: language,
	//       },
	//     });
	//     createdLanguages.push(createdLanguage);
	//   }
	//   // GENERATE COUNSELLORS
	//   let createdCounsellors = [];
	//   for (let i = 1; i <= numberOfCounsellors; i++) {
	//     const { specialties, ...counsellor } = generateCounsellor();
	//     let createdCounsellor = await seedingClient.counsellor.create({
	//       data: {
	//         ...counsellor,
	//         languages: {
	//           connect: [
	//             {
	//               id: createdLanguages[
	//                 randomNumberGenerator(0, languagesList.length - 1)
	//               ].id,
	//             },
	//             {
	//               id: createdLanguages[
	//                 randomNumberGenerator(0, languagesList.length - 1)
	//               ].id,
	//             },
	//             {
	//               id: createdLanguages[
	//                 randomNumberGenerator(0, languagesList.length - 1)
	//               ].id,
	//             },
	//           ],
	//         },
	//         specialties: {
	//           connect: [
	//             {
	//               id: createdSpecialties[
	//                 randomNumberGenerator(0, createdSpecialties.length - 1)
	//               ].id,
	//             },
	//             {
	//               id: createdSpecialties[
	//                 randomNumberGenerator(0, createdSpecialties.length - 1)
	//               ].id,
	//             },
	//             {
	//               id: createdSpecialties[
	//                 randomNumberGenerator(0, createdSpecialties.length - 1)
	//               ].id,
	//             },
	//             {
	//               id: createdSpecialties[
	//                 randomNumberGenerator(0, createdSpecialties.length - 1)
	//               ].id,
	//             },
	//             {
	//               id: createdSpecialties[
	//                 randomNumberGenerator(0, createdSpecialties.length - 1)
	//               ].id,
	//             },
	//           ],
	//         },
	//       },
	//     });
	//     createdCounsellors.push(createdCounsellor);
	//   }

	//   //GENERATE USERS
	//   let createdUsers = [];

	// const user1 = await seedingClient.user.create({
	// 	data: {
	// 		firstName: "Shahon",
	// 		lastName: "Blaley",
	// 		avatar: "https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
	// 		username: "stranger123",
	// 		password: "test",
	// 		counsellor_ID: 2,
	// 	},
	// });
	// createdUsers.push(user1);

	// const user2 = await seedingClient.user.create({
	// 	data: {
	// 		firstName: "Alex",
	// 		lastName: "Davey",
	// 		avatar: "https://images.pexels.com/photos/1056251/pexels-photo-1056251.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
	// 		username: "catperson77",
	// 		password: "test",
	// 		counsellor_ID: 1,
	// 	},
	// });
	// createdUsers.push(user2);

	//GENERATE MESSAGES
	//   let createdMessages = [];

	//   for (const user of createdUsers) {
	//     let i = 1;
	//     await seedingClient.message.create({
	//       data: {
	//         date: "07/09/2021",
	//         content: "Hello, looking forward to starting counselling with you.",
	//         user: { connect: { id: user.id } },
	//         conversation: {
	//           create: {
	//             user_ID: user.id,
	//             counsellor_ID: i,
	//           },
	//         },
	//       },
	//     });
	//     // await seedingClient.message.create({
	// 	data: {
	// 		date: "07/09/2021",
	// 		content:
	// 			"Hello, looking forward to starting with you too. We'll start things off during our next appointment.",
	// 		counsellor: { connect: { id: user.counsellor_ID } },
	// 		conversation: { include: { id: i } },
	// 	},
	// });
	// i = i + 1;
	//   }
	// let createdUsers = [];
	// for (let i = 1; i <= numberOfUsers; i++) {
	// 	const user = generateUser(i);
	// 	const userCreated = await seedingClient.user.create({
	// 		data: {
	// 			...user,
	// 			// 	messages: {
	// 			// 		create: {
	// 			// 			date: faker.date.recent(),
	// 			// 			content: faker.lorem.sentence(),
	// 			// 			user: {connect:{id: i}},
	// 			// 			counsellor_ID: user.counsellor_ID,
	// 			// 		},
	// 			// 	},
	// 			// 	appointments: {
	// 			// 		create: {
	// 			// 			date: faker.date.recent(),
	// 			// 			time: faker.time.recent(),
	// 			// 			user: i,
	// 			// 			counsellor_ID: user.counsellor_ID,
	// 			// 		},
	// 			// 	},
	// 			// 	reviews: {
	// 			// 		create: {
	// 			// 			date: faker.date.recent(),
	// 			// 			content: faker.lorem.paragraph(),
	// 			// 			user: i,
	// 			// 			counsellor_ID: user.counsellor_ID,
	// 			// 		},
	// 			// 	},
	// 		},
	// 	});
	// 	createdUsers.push(userCreated);
	// }

	// COUNSELLOR ON SERVICES
	// for (const counsellor of createdCounsellors) {
	// 	for (let j = 1; j <= 5; j++) {
	// 		await seedingClient.counsellorOnService.create({
	// 			data: {
	// 				counsellor: { connect: { id: counsellor.id } },
	// 				service: { connect: { id: randomNumberGenerator(0, 19) } },
	// 			},
	// 		});
	// 	}
	// }

	//create a counsellorOnService where each councillor will have five random services
	//doesn't quite work. Have to manually change the i counter and only adds 3 or 4
	// for (let i = 5; i < numberOfCounsellors * 5; i++) {
	// 	for (let j = 1; j <= 5; j++) {
	// 		const randomNumberArray = [
	// 			randomNumberGenerator(0, 3),
	// 			randomNumberGenerator(4, 9),
	// 			randomNumberGenerator(10, 13),
	// 			randomNumberGenerator(14, 17),
	// 			randomNumberGenerator(18, 19),
	// 		];
	// 		await seedingClient.counsellorOnService.create({
	// 			data: {
	// 				service_ID: randomNumberArray[j],
	// 				counsellor_ID: i,
	// 			},
	// 		});
	// 	}
	// }

	// //GENERATING MESSAGES  TODO
	// for(const user of createdUsers) {
	//     await seedingClient.message.create
	// }

	// for (let i = 1; i <= numberOfCounsellors; i++) {
	// 	const reviewBody = generateReview();
	// 	for (let j = 1; j <= 5; j++) {
	// 		const review = await seedingClient.review.create({
	// 			data: {
	// 				...reviewBody,
	// 				counsellor_ID: i,
	// 				user_ID: randomNumberGenerator(1, 100),
	// 			},
	// 		});
	// 		console.log(review);
	// 	}
	// }
	// console.log(randomNumberGenerator(1, 20));

	//CREATING MESSAGES FOR USER 2
	// await seedingClient.message.create({
	// 	data: {
	// 		date: "09/09/2021",
	// 		content: "Hello, I'm super excited to start counselling with you!",
	// 		user: { connect: { id: 2 } },
	// 		counsellor: undefined,
	// 		conversation: {
	// 			create: {
	// 				user: { connect: { id: 2 } },
	// 				counsellor: { connect: { id: 2 } },
	// 			},
	// 		},
	// 	},
	// });
	// await seedingClient.message.create({
	// 	data: {
	// 		date: "09/09/2021",
	// 		content:
	// 			"Hello, I'm glad you're excited. Very much looking forward to meeting you!",
	// 		user: undefined,
	// 		counsellor: { connect: { id: 2 } },
	// 		conversation: { connect: { id: 1 } },
	// 	},
	// });
	await seedingClient.message.delete({
		where: {
			id: 3,
		},
	});
}

main()
	.catch((e) => {
		console.error(e);
	})
	.finally(async () => {
		await seedingClient.$disconnect();
		process.exit();
	});

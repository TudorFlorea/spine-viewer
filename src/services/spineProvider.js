import demoSpine from "../config/demoSpine";

const getFileNameFromPath = (path) => {
	const paths = path.split("/");
	return paths[paths.length - 1];
};

export const getDemoSpine = () => {
	return new Promise((rv, rj) => {
		const fileRequests = demoSpine.files.map((file) => {
			return fetch(file).then((response) => {
				switch (true) {
					case response.url.indexOf(".png") !== -1:
						return response
							.blob()
							.then((data) => {
								return new Promise((resolve) => {
									const fr = new FileReader();
									fr.onload = () => {
										const name = getFileNameFromPath(file);
										resolve({
											type: "png",
											data: fr.result,
											name: name,
											path: name,
										});
									};
									fr.readAsDataURL(data);
								});
							})
							.catch((err) => rj(err));
					case response.url.indexOf(".json") !== -1:
						return response
							.text()
							.then((data) => {
								return new Promise((resolve) => {
									const name = getFileNameFromPath(file);
									resolve({
										type: "json",
										data: data,
										name: name,
										path: name,
									});
								});
							})
							.catch((err) => rj(err));
					case response.url.indexOf(".atlas") !== -1:
						return response
							.text()
							.then((data) => {
								return new Promise((resolve) => {
									const name = getFileNameFromPath(file);
									resolve({
										type: "atlas",
										data: data,
										name: name,
										path: name,
									});
								});
							})
							.catch((err) => rj(err));

					default:
						throw new Error("Unknown file: ", file);
				}
			});
		});
		Promise.all(fileRequests)
			.then((responses) => {
				rv(responses);
			})
			.catch((err) => rj(err));
	});
};

const { Login, Students, Teachers, Internships, Companies, Addresses, ContactPersons, PresentAddresses, HometownAddresses, Educations, CoStudentInternships } = require("../../models/internship");
const { Op } = require('sequelize')


exports.createLogin = async (req, res) => {
	try {
		const isAdmin = await Login.findOne({ where: { id: req.user.id, roles: 'admin' } })
		const { username, password, roles } = req.body?.login;
		if (isAdmin != null) {
			const isExist = await Login.findOne({ where: { username: username } })
			if (isExist == null) {
				const loginResp = await Login.create({ username, password, roles })
				if (loginResp.roles == 'student') {
					console.log("\n\n\n\n", loginResp, "\n\n\n\n")
					const { first_name, last_name, program, phone } = req.body?.student
					const respStudentData = await Students.create({ id: username, first_name, last_name, phone, program, department: "", login_id: loginResp.id })
					const { id } = respStudentData;

					// hook education table for student
					await Educations.create({ student_id: id })
					await Educations.create({ student_id: id })
					await Educations.create({ student_id: id })

					// hook address table for student
					await Addresses.create({ address_type: "hometown" }).then(data => {
						HometownAddresses.create({ student_id: id, address_id: data.id })
					})

					await Addresses.create({ address_type: "present" }).then(data => {
						PresentAddresses.create({ student_id: id, address_id: data.id })
					})

					// hook address table for contact_person
					await Addresses.create({ address_type: "contact_person" }).then(data => {
						// hook table contact_person for student
						ContactPersons.create({ first_name: "", last_name: "", student_id: id, address_id: data.id })
					})

					// hook table address for company 
					const companyAddress = await Addresses.create({ address_type: "company" })
					const companyData = await Companies.create({ name: "", address_id: companyAddress.id })
					const resp = await Internships.create({ student_id: id, company_id: companyData.id })
					// hook co stdeutn table for student
					await CoStudentInternships.create({ internship_id: resp.id })
					await CoStudentInternships.create({ internship_id: resp.id })
					await CoStudentInternships.create({ internship_id: resp.id })
					await CoStudentInternships.create({ internship_id: resp.id })

				}

				if (loginResp.roles == "director") {
					const { first_name, last_name, phone, program, department } = req.body?.director
					const { id } = loginResp
					await Teachers.create({ id: username, first_name, last_name, phone, program, department, login_id: id })

				}

				res.status(200).json({ success: true, msg: "create login success" })
			} else {
				res.status(401).json({ success: false, msg: "create login faild user is exist" })
			}
		} else {
			res.status(404).json({ success: false, msg: "404 Not Found" })
		}

	} catch (err) {
		console.log({ msg: "on user controller", error: err })
		res.status(500).json({ success: false, msg: "something went wrong!" })
	}

}

exports.getLogin = async (req, res) => {
	try {
		const isAdmin = await Login.findOne({ where: { id: req.user.id, roles: 'admin' } })
		if (isAdmin != null) {
			const page = parseInt(req.query.page);
			const perPage = parseInt(req.query.per_page);
			const sortColumn = req.query.sort_column;
			const sortDirection = req.query.sort_direction;
			const search = req.query.search;
			const startIndex = (page - 1) * perPage;

			const total = await Login.count();
			let totalPages = total / perPage;
			let resp;

			if (search && sortColumn) {
				resp = await Login.findAll({
					offset: startIndex,
					limit: perPage,
					attributes: { exclude: ["password"] },
					where: {
						username: {
							[Op.like]: `%${search}%`,
						},
						is_active: 1
					},
					order: [[sortColumn, sortDirection]],
					raw: true,
				});
			} else if (search) {
				resp = await Login.findAll({
					attributes: { exclude: ["password"] },
					where: {
						username: {
							[Op.like]: `%${search}%`,
						},
						is_active: 1
					},
					raw: true,
				});
			} else if (sortColumn) {
				resp = await Login.findAll({
					offset: startIndex,
					limit: perPage,
					attributes: { exclude: ["password"] },
					where: { is_active: 1 },
					order: [[sortColumn, sortDirection]],
					raw: true,
				});
			} else {
				resp = await Login.findAll({
					offset: startIndex,
					limit: perPage,
					attributes: { exclude: ["password"] },
					where: { is_active: 1 },
					raw: true,
				});
			}
			res.status(200).json({
				success: true,
				msg: "get Login success",
				data: {
					page: page,
					per_page: perPage,
					total_pages: totalPages,
					total: total,
					data: resp,
				},
			});
		} else {
			res.status(404).json({ success: false, msg: "404 Not Found" })
		}
	} catch (err) {
		console.log({ msg: "on login controller", error: err })
		res.status(500).json({ success: false, msg: "something went wrong!" })
	}
}

exports.getNotActiveLogin = async (req, res) => {
	try {
		const isAdmin = await Login.findOne({ where: { id: req.user.id, roles: 'admin' } })
		if (isAdmin != null) {
			const page = parseInt(req.query.page);
			const perPage = parseInt(req.query.per_page);
			const sortColumn = req.query.sort_column;
			const sortDirection = req.query.sort_direction;
			const search = req.query.search;
			const startIndex = (page - 1) * perPage;

			const total = await Login.count();
			let totalPages = total / perPage;
			let resp;

			if (search && sortColumn) {
				resp = await Login.findAll({
					offset: startIndex,
					limit: perPage,
					attributes: { exclude: ["password"] },
					where: {
						username: {
							[Op.like]: `%${search}%`,
						},
						is_active: 0
					},
					order: [[sortColumn, sortDirection]],
					raw: true,
				});
			} else if (search) {
				resp = await Login.findAll({
					attributes: { exclude: ["password"] },
					where: {
						username: {
							[Op.like]: `%${search}%`,
						},
						is_active: 0
					},
					raw: true,
				});
			} else if (sortColumn) {
				resp = await Login.findAll({
					offset: startIndex,
					limit: perPage,
					attributes: { exclude: ["password"] },
					where: { is_active: 0 },
					order: [[sortColumn, sortDirection]],
					raw: true,
				});
			} else {
				resp = await Login.findAll({
					offset: startIndex,
					limit: perPage,
					attributes: { exclude: ["password"] },
					where: { is_active: 0 },
					raw: true,
				});
			}
			res.status(200).json({
				success: true,
				msg: "get Login success",
				data: {
					page: page,
					per_page: perPage,
					total_pages: totalPages,
					total: total,
					data: resp,
				},
			});
		} else {
			res.status(404).json({ success: false, msg: "404 Not Found" })
		}
	} catch (err) {
		console.log({ msg: "on login controller", error: err })
		res.status(500).json({ success: false, msg: "something went wrong!" })
	}
}

exports.updateLogin = async (req, res) => {
	try {
		const isAdmin = await Login.findOne({ where: { id: req.user.id, roles: 'admin' } })
		const { username, password, roles } = req.body;

		if (isAdmin != null) {
			await Login.update({ username, password, roles }, { where: { id: req.params.id } })
			res.status(200).json({ success: true, msg: "update login success" })
		} else {
			res.status(404).json({ success: false, msg: "404 Not Found" })
		}

	} catch (err) {
		console.log({ msg: "on login controller", error: err })
		res.status(500).json({ success: false, msg: "something went wrong!" })
	}
}

exports.deleteLogin = async (req, res) => {
	try {
		const isAdmin = await Login.findOne({ where: { id: req.user.id, roles: 'admin' } })

		if (isAdmin != null) {
			await Login.update({ is_active: 0 }, { where: { id: req.params.id } })
			res.status(200).json({ success: true, msg: `delete login id: ${req.params.id} successfuly` })
		} else {
			res.status(404).json({ success: false, msg: "404 Not Found" })
		}

	} catch (err) {
		console.log({ msg: "on login controller", error: err })
		res.status(500).json({ success: false, msg: "something went wrong!" })
	}
}
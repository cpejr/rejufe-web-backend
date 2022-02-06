const { celebrate, Segments, Joi } = require("celebrate");
var strongRegex = new RegExp("^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");

module.exports = {
  create: celebrate({
    [Segments.HEADERS]: Joi.object()
      .keys({
        authorization: Joi.string().required(),
      })
      .unknown(),
    [Segments.BODY]: Joi.object().keys({
      type: Joi.string().valid('administrador', 'usuario').required(),
      name: Joi.string().required(),
      user: Joi.string().required(),
      office: Joi.string().required(),
      nacionality: Joi.string().required(),
      cpf: Joi.string().required(),
      birth: Joi.date().required(),
      place_of_birth: Joi.string().required(),
      gender: Joi.string().valid('MASCULINO', 'FEMININO', 'OUTROS').required(),
      civil_state: Joi.string().valid('SOLTEIRO(A)', 'CASADO(A)', 'DIVORCIADO(A)', 'DESQUITADO(A)', 'OUTROS').required(),
      spouse: Joi.string().optional(),
      birth_spouse: Joi.date().optional(),
      sons: Joi.string().optional(),
      cep: Joi.string().required(),
      profissional_address: Joi.string().required(),
      profissional_number: Joi.string().required(),
      profissional_complement: Joi.string(),
      profissional_district: Joi.string().required(),
      profissional_city: Joi.string().required(),
      profissional_state: Joi.string().required(),
      allocation: Joi.string().valid('CEARÁ', 'RIO GRANDE DO NORTE', 'PARAÍBA', 'PERNAMBUCO', 'ALAGOAS', 'SERGIPE').required(),
      acting: Joi.string().required(),
      personal_address: Joi.string(),
      personal_number: Joi.string(),
      personal_complement: Joi.string(),
      personal_district: Joi.string(),
      personal_city: Joi.string(),
      personal_state: Joi.string(),
      telephone: Joi.string(),
      fax: Joi.string(),
      cell_phone_number: Joi.string().required(),
      email: Joi.string().email().required(),
      email_REJUFE: Joi.boolean(),
      email_ASCOM: Joi.boolean(),
      admission_date: Joi.date().required(),
      password: Joi.string().pattern(strongRegex).required(),
    }),
  }),
  getAll: celebrate({
    [Segments.HEADERS]: Joi.object()
      .keys({
        authorization: Joi.string().required(),
      })
      .unknown(),
    [Segments.QUERY]: Joi.object().keys({
      times: Joi.number().integer().required(),
      field: Joi.string().allow(null, ''),
      filter: Joi.allow(null, ''),
    }),
  }),
  getById: celebrate({
    [Segments.HEADERS]: Joi.object()
      .keys({
        authorization: Joi.string().required(),
      })
      .unknown(),
    [Segments.PARAMS]: Joi.object().keys({
      id: Joi.string().required(),
    }),
  }),

  getUserEmailByUsername: celebrate({
    [Segments.BODY]: Joi.object().keys({
      user: Joi.string().required(),
    }),
  }),

  update: celebrate({
    [Segments.HEADERS]: Joi.object()
      .keys({
        authorization: Joi.string().required(),
      })
      .unknown(),
    [Segments.PARAMS]: Joi.object().keys({
      id: Joi.string().required(),
    }),
    [Segments.BODY]: Joi.object().keys({
      firebaseId: Joi.string(),
      type: Joi.string().valid('ADMINISTRADOR', 'USUÁRIO').insensitive(),
      name: Joi.string(),
      user: Joi.string(),
      office: Joi.string(),
      nacionality: Joi.string(),
      cpf: Joi.string(),
      birth: Joi.date(),
      place_of_birth: Joi.string(),
      gender: Joi.string().valid('MASCULINO', 'FEMININO', 'OUTROS').insensitive(),
      civil_state: Joi.string().valid('SOLTEIRO(A)', 'CASADO(A)', 'DIVORCIADO(A)', 'DESQUITADO(A)', 'OUTROS').insensitive(),
      spouse: Joi.string(),
      birth_spouse: Joi.date(),
      sons: Joi.string(),
      cep: Joi.string(),
      profissional_address: Joi.string(),
      profissional_number: Joi.string(),
      profissional_complement: Joi.string(),
      profissional_district: Joi.string(),
      profissional_city: Joi.string(),
      profissional_state: Joi.string(),
      allocation: Joi.string().valid('CEARÁ', 'RIO GRANDE DO NORTE', 'PARAÍBA', 'PERNAMBUCO', 'ALAGOAS', 'SERGIPE').insensitive(),
      acting: Joi.string(),
      personal_address: Joi.string(),
      personal_number: Joi.string(),
      personal_complement: Joi.string(),
      personal_district: Joi.string(),
      personal_city: Joi.string(),
      personal_state: Joi.string(),
      telephone: Joi.string(),
      fax: Joi.string(),
      cell_phone_number: Joi.string(),
      email: Joi.string().email(),
      email_REJUFE: Joi.boolean(),
      email_ASCOM: Joi.boolean(),
      admission_date: Joi.date(),
    }).min(1),
  }),

  delete: celebrate({
    [Segments.HEADERS]: Joi.object()
      .keys({
        authorization: Joi.string().required(),
      })
      .unknown(),
    [Segments.PARAMS]: Joi.object().keys({
      id: Joi.string().required(),
    }),
  }),
};
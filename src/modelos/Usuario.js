const { Model } = require('objection');

class Usuario extends Model {
  static get tableName() {
    return 'usuarios';
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['nome','email'],
      properties: {
        id: { type: 'integer' },
        nome: { type: 'string', minLength: 1, maxLength: 255 },
        email: { type: 'string', format: 'email' },
        telefone: { type: ['string','null'] }
      }
    };
  }

  static get relationMappings() {
    const Reserva = require('./Reserva');
    return {
      reservas: {
        relation: Model.HasManyRelation,
        modelClass: Reserva,
        join: {
          from: 'usuarios.id',
          to: 'reservas.usuario_id'
        }
      }
    };
  }
}

module.exports = Usuario;

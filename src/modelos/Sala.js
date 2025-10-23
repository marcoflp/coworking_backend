const { Model } = require('objection');

class Sala extends Model {
  static get tableName() {
    return 'salas';
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['nome','capacidade'],
      properties: {
        id: { type: 'integer' },
        nome: { type: 'string', minLength: 1, maxLength: 255 },
        capacidade: { type: 'integer' },
        localizacao: { type: ['string','null'] },
        recursos: { type: ['string','null'] }
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
          from: 'salas.id',
          to: 'reservas.sala_id'
        }
      }
    };
  }
}

module.exports = Sala;

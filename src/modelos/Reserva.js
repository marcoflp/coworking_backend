const { Model } = require('objection');

class Reserva extends Model {
  static get tableName() {
    return 'reservas';
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['usuario_id','sala_id','horario_inicio','horario_fim'],
      properties: {
        id: { type: 'integer' },
        usuario_id: { type: 'integer' },
        sala_id: { type: 'integer' },
        horario_inicio: { type: 'string' },
        horario_fim: { type: 'string' },
        proposito: { type: ['string','null'] }
      }
    };
  }

  $parseDatabaseJson(json) {
    json = super.$parseDatabaseJson(json);
    if (json.horario_inicio) {
      json.horario_inicio = new Date(json.horario_inicio).toISOString();
    }
    if (json.horario_fim) {
      json.horario_fim = new Date(json.horario_fim).toISOString();
    }
    return json;
  }

  static get relationMappings() {
    const Usuario = require('./Usuario');
    const Sala = require('./Sala');
    return {
      usuario: {
        relation: Model.BelongsToOneRelation,
        modelClass: Usuario,
        join: {
          from: 'reservas.usuario_id',
          to: 'usuarios.id'
        }
      },
      sala: {
        relation: Model.BelongsToOneRelation,
        modelClass: Sala,
        join: {
          from: 'reservas.sala_id',
          to: 'salas.id'
        }
      }
    };
  }
}

module.exports = Reserva;

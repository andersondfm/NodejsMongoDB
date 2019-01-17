'use strict';

const ValidationContract = require('../validators/validador');
const repository = require('../repositories/produto-repository');
const authService = require('../services/auth-service');
const md5 = require('md5');

//Inserir
exports.post = (req, res, next) => {
    let contract = new ValidationContract();
    contract.hasMinLen(req.body.title, 3, 'O item tem que ter no minimo 3 caracteres');

    if (!contract.isValid()) {
        res.status(400).send(contract.errors()).end();
        return;
    }

    var produto = new Produto(req.body);
    produto.save()
        .then(x => {
            res.status(201).send({
                message: 'Produto cadastrado com sucesso!'
            });
        }).catch(e => {
            res.status(400).send({
                message: 'Falha ao cadastrar o produto!',
                data: e
            });
        })
};

//Buscar Produto com repository e async
exports.get = async (req, res, next) => {
try{    
    var data = await repository.get();
    res.status(200).send(data);
  } catch (e){
    res.status(500).send({
        message: 'Falha ao processar sua requisição'
    });  
  }
}


//Buscar por Slug
exports.getBySlug = (req, res, next) => {
    Produto
        .findOne({
            slug: req.params.slug
        },
            'title price, slug')
        .then(data => {
            res.status(200).send(data);
        }).catch(e => {
            res.status(400).send(e);
        });
}

//Buscar por ID
exports.getByID = (req, res, next) => {
    Produto
        .findById(req.params.id)
        .then(data => {
            res.status(200).send(data);
        }).catch(e => {
            res.status(400).send(e);
        });
}


//Buscar por Tag
exports.getByTag = (req, res, next) => {
    Produto
        .findOne({
            tags: req.params.tag
        },
            'title price, slug')
        .then(data => {
            res.status(200).send(data);
        }).catch(e => {
            res.status(400).send(e);
        });
}

//Deletar
exports.delete = (req, res, next) => {
    Produto.findOneAndRemove(req.body.id)
        .then(x => {
            res.status(200).send({
                message: 'Produto removido com sucesso!'
            });
        }).catch(e => {
            res.status(400).send({
                message: 'Falha ao remover o produto!',
                data: e
            });
        })

};

//Atualizar
exports.put = (req, res, next) => {
    Produto
        .findOneAndUpdate(req.body.id, {
            $set: {
                title: req.body.title,
                description: req.body.description,
                slug: req.body.slug,
                price: req.body.price
            }
        }).then(x => {
            res.status(200).send({
                message: 'Produto Atualizado com sucesso!'
            });
        }).catch(e => {
            res.status(400).send({
                message: 'Falha ao Atualizar o produto!',
                data: e
            });
        })

};
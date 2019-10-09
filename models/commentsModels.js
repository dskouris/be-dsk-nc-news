const knex = require('../connection');

exports.postComment = comment => {
  comment.author = comment.username;
  delete comment.username;
  return knex
    .insert(comment)
    .into('comments')
    .returning('*')
    .then(postedComment => {
      return { new_comment: postedComment[0] };
    });
};

exports.fetchCommentsForArticle = (
  id,
  sortBy = 'created_at',
  order = 'desc'
) => {
  return knex('comments')
    .select('*')
    .where({ article_id: id })
    .orderBy(sortBy, order)
    .then(comments => {
      return { comments };
    });
};

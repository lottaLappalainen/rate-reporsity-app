import { gql } from '@apollo/client';

export const GET_REPOSITORIES = gql`
  query {
    repositories {
      edges {
        node {
          id
          fullName
          description
          language
          stargazersCount
          forksCount
          reviewCount
          ratingAverage
          ownerAvatarUrl
        }
      }
    }
  }
`;

export const GET_USER = gql`
  query {
    me {
      id
      username
    }
  }
`;

export const GET_REPOSITORY = gql`
  query getRepository($id: ID!) {
    repository(id: $id) {
      id
      fullName
      description
      url
      language
      stargazersCount
      forksCount
      reviewCount
      ratingAverage
      ownerAvatarUrl
    }
  }
`;

export const GET_REVIEWS = gql`
  query getReviews($id: ID!) {
    repository(id: $id) {
      id
      fullName
      reviews {
        edges {
          node {
            id
            text
            rating
            createdAt
            user {
              id
              username
            }
          }
        }
      }
    }
  }
`;
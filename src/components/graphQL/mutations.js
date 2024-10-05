import { gql } from '@apollo/client';

export const AUTHENTICATE_USER = gql`
  mutation Authenticate($credentials: AuthenticateInput!) {
    authenticate(credentials: $credentials) {
      accessToken
    }
  }
`;

export const CREATE_REVIEW = gql`
  mutation CreateReview($review: CreateReviewInput!) {
    createReview(review: $review) {
      userId
      user {
        id
        username
      }
      text
      repositoryId
      repository {
        id
        name
      }
      rating
      id
      createdAt
    }
  }
`;
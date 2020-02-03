import gql from 'graphql-tag';

export const userTasks = gql`
  query($startDateTimeUtc: DateTime!, $endDateTimeUtc: DateTime!) {
    userTasks(
      query: {
        startDateTimeUtc: $startDateTimeUtc
        endDateTimeUtc: $endDateTimeUtc
      }
    ) {
      content {
        id
        type
        status
        orid
        note
        createdAt
        offerRequest {
          orid
          bethMoveInReadyDate
          seller {
            name
            phoneNumber
          }
          sellerSuccessAgent {
            name
          }
          heroImage {
            url
          }
          lockBoxCode
          homeInspectionNote
          property {
            propertyId
            fullAddress
            address
            city
            zip
            state
            bedrooms
            bathrooms
            sqft
            gateCode
            yearBuilt
            hasSeptic
            moveOutDatetime
          }
        }
      }
    }
  }
`;

export const createTask = gql`
  mutation($taskInput: CreateTaskInput!) {
    createTask(taskInput: $taskInput) {
      id
      type
      status
      orid
      note
      createdAt
      offerRequest {
        orid
        bethMoveInReadyDate
        seller {
          name
          phoneNumber
        }
        sellerSuccessAgent {
          name
        }
        heroImage {
          url
        }
        lockBoxCode
        homeInspectionNote
        property {
          propertyId
          fullAddress
          address
          city
          zip
          state
          bedrooms
          bathrooms
          sqft
          gateCode
          yearBuilt
          hasSeptic
          moveOutDatetime
        }
      }
    }
  }
`;

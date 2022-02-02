import { GraphQLClient, gql } from 'graphql-request';

const graphqlAPI = process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT;

/** *************************************************************
* Any file inside the folder pages/api is mapped to /api/* and  *
* will be treated as an API endpoint instead of a page.         *
*************************************************************** */

// export a default function for API route to work
export default async function comments(req, res) {
  const graphQLClient = new GraphQLClient((graphqlAPI), {
    headers: {
      authorization: `Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6ImdjbXMtbWFpbi1wcm9kdWN0aW9uIn0.eyJ2ZXJzaW9uIjozLCJpYXQiOjE2NDIyNTYzNDcsImF1ZCI6WyJodHRwczovL2FwaS1hcC1zb3V0aGVhc3QtMi5ncmFwaGNtcy5jb20vdjIvY2t5ZnF3bTJrMHdzdjAxeGdmd3ExN3Z0NS9tYXN0ZXIiLCJodHRwczovL21hbmFnZW1lbnQtbmV4dC5ncmFwaGNtcy5jb20iXSwiaXNzIjoiaHR0cHM6Ly9tYW5hZ2VtZW50LmdyYXBoY21zLmNvbS8iLCJzdWIiOiI4ZjI0MjY0My0xYjk5LTQzYmUtYWUyMy01NzBlOTNkOGIwZGYiLCJqdGkiOiJja3lmeDB6Y3AxNDh4MDF4dGVjaGdjM3BkIn0.HQk9eaVofMJqNJbdO7DtB20ldTyLIIy5F1UXgmicIH02vE00uqYSKnuCeL_YaNW0kZVeX4vqmVCyDw4YX0ekfS2I4Gg4GfHNa7kAu2sHIcqySm1krkbcl3NXn1QC9iPPGkP-D2Dv_jFvwAkFIK1raBZhUxFDiVvXeCOE_cfbCgGa2m_EropakVYrcGvF1PbvBeeJ0bDudOkxa8YKXY4y_rCiLr50bBIYMePRi8JSXympYsxRdl1vjq-_CTU9n_hLkPQkGii15_5qodA8uXb39kqpCg_8edXENatJgb_aUKrQYRc9J6m7WwBRrCIfY7slRu8dnkZsNkFuXkTIRxZ14n_8TnUzwabH1vWdBWupyn5_WKIIBdfiIcGyNBDs9Ty8q1QPoHTalZV-LyooTqoaW_TNCWKM5okz_XrdH3tXzzVt9rQlo5vgkeXnbtLEwL3ZZSEOTkRB_GUPAiiHt1JrW4f36FtL8yFna3x354vDnR6ojGApfNoli7gtrTiUGKbfTQ3lBe0F3QYrsY0b9n_u3XgZBhVXMLpl6RnjM7anzcQjjssTH4SivVNGtjONbdhGIoSXuK8wP3r2FFaAaTmdk2vIe5rwmR4EqzdtkM8tpTja6tRSaOj-HLUBrNU4rOCXNY9upbNw7YLvORxF1LPmXH7xOnxPDWZmGDOLWT8C6gg`,
    },
  });

  const query = gql`
    mutation CreateComment($name: String!, $email: String!, $comment: String!, $slug: String!) {
      createComment(data: {name: $name, email: $email, comment: $comment, post: {connect: {slug: $slug}}}) { id }
    }
  `;

  const result = await graphQLClient.request(query, {
    name: req.body.name,
    email: req.body.email,
    comment: req.body.comment,
    slug: req.body.slug,
  });

  return res.status(200).send(result);
}

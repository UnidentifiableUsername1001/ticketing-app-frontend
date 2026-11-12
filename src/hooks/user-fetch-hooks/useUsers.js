import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { config } from "../../../config";
import { HttpError } from "../../utils/errors";
import { useParams } from "react-router-dom";

const url = (endpoint='') => `${config.backendUrl}/api/ticket/${endpoint}`;
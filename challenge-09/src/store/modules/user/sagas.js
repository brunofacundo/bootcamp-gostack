import { toast } from 'react-toastify';
import { all, call, put, takeLatest } from 'redux-saga/effects';
import api from '~/services/api';
import { updateProfileFailure, updateProfileSuccess } from './actions';

export function* updateProfile({ payload }) {
    try {
        const { name, email, ...rest } = payload.data;

        const profile = { name, email, ...(rest.oldPassword ? rest : {}) };

        const response = yield call(api.put, 'users', profile);

        toast.success('Perfil atualizado com sucesso!');

        yield put(updateProfileSuccess(response.data));
    } catch (err) {
        toast.error('Erro ao atualizar perfil, confira seus dados!');
        yield put(updateProfileFailure());
    }
}

export default all([takeLatest('@user/UPDATE_PROFILE_REQUEST', updateProfile)]);

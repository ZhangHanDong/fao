require 'test_helper'

class BbAuthUsersControllerTest < ActionController::TestCase
  def test_should_get_index
    get :index
    assert_response :success
    assert_not_nil assigns(:bb_auth_users)
  end

  def test_should_get_new
    get :new
    assert_response :success
  end

  def test_should_create_bb_auth_user
    assert_difference('BbAuthUser.count') do
      post :create, :bb_auth_user => { }
    end

    assert_redirected_to bb_auth_user_path(assigns(:bb_auth_user))
  end

  def test_should_show_bb_auth_user
    get :show, :id => bb_auth_users(:one).id
    assert_response :success
  end

  def test_should_get_edit
    get :edit, :id => bb_auth_users(:one).id
    assert_response :success
  end

  def test_should_update_bb_auth_user
    put :update, :id => bb_auth_users(:one).id, :bb_auth_user => { }
    assert_redirected_to bb_auth_user_path(assigns(:bb_auth_user))
  end

  def test_should_destroy_bb_auth_user
    assert_difference('BbAuthUser.count', -1) do
      delete :destroy, :id => bb_auth_users(:one).id
    end

    assert_redirected_to bb_auth_users_path
  end
end

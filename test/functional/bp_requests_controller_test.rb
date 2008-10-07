require 'test_helper'

class BpRequestsControllerTest < ActionController::TestCase
  def test_should_get_index
    get :index
    assert_response :success
    assert_not_nil assigns(:bp_requests)
  end

  def test_should_get_new
    get :new
    assert_response :success
  end

  def test_should_create_bp_request
    assert_difference('BpRequest.count') do
      post :create, :bp_request => { }
    end

    assert_redirected_to bp_request_path(assigns(:bp_request))
  end

  def test_should_show_bp_request
    get :show, :id => bp_requests(:one).id
    assert_response :success
  end

  def test_should_get_edit
    get :edit, :id => bp_requests(:one).id
    assert_response :success
  end

  def test_should_update_bp_request
    put :update, :id => bp_requests(:one).id, :bp_request => { }
    assert_redirected_to bp_request_path(assigns(:bp_request))
  end

  def test_should_destroy_bp_request
    assert_difference('BpRequest.count', -1) do
      delete :destroy, :id => bp_requests(:one).id
    end

    assert_redirected_to bp_requests_path
  end
end
